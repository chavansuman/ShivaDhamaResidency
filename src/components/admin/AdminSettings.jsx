
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { checkCredentials, updateCredentials, getCurrentUsername } from '@/lib/auth';
import { UserCog, Lock, Save, Loader2, ShieldCheck, Eye, EyeOff, Database, Download, Upload, AlertTriangle } from 'lucide-react';

const AdminSettings = () => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const fileImportRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const user = getCurrentUsername();
    setCurrentUsername(user);
    setFormData(prev => ({ ...prev, newUsername: user }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    try {
        const isValid = await checkCredentials(currentUsername, formData.currentPassword);
        if (!isValid) {
             toast({ title: "Authentication Failed", description: "Incorrect current password.", variant: "destructive" });
             setIsLoading(false);
             return;
        }

        const passwordToSet = formData.newPassword || formData.currentPassword;
        const usernameToSet = formData.newUsername;

        await updateCredentials(usernameToSet, passwordToSet);
        toast({ title: "Success", description: "Admin profile updated successfully." });
        
        setCurrentUsername(usernameToSet);
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));

    } catch (error) {
        toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  // --- Full Site Backup Logic ---
  const handleFullBackup = () => {
      // Collect all local storage keys related to data
      const data = {
          properties: JSON.parse(localStorage.getItem('shivadhama_properties') || '[]'),
          siteContent: JSON.parse(localStorage.getItem('shivadhama_content') || '{}'),
          pageImages: JSON.parse(localStorage.getItem('shivadhama_images') || '{}'),
          blogs: JSON.parse(localStorage.getItem('shivadhama_blogs') || '[]'),
          timestamp: new Date().toISOString(),
          version: '1.0'
      };

      const dataStr = JSON.stringify(data, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `full_site_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      
      toast({ title: "Full Backup Downloaded", description: "Contains properties, pages, images, and blogs." });
  };

  const handleFullRestore = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!window.confirm("CRITICAL WARNING: This will completely WIPE current site data and replace it with the backup. Are you sure?")) {
          e.target.value = '';
          return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
          try {
              const backup = JSON.parse(event.target.result);
              
              if (backup.properties) localStorage.setItem('shivadhama_properties', JSON.stringify(backup.properties));
              if (backup.siteContent) localStorage.setItem('shivadhama_content', JSON.stringify(backup.siteContent));
              if (backup.pageImages) localStorage.setItem('shivadhama_images', JSON.stringify(backup.pageImages));
              if (backup.blogs) localStorage.setItem('shivadhama_blogs', JSON.stringify(backup.blogs));

              toast({ title: "Restore Successful", description: "Site data has been restored. Reloading..." });
              setTimeout(() => window.location.reload(), 1500);

          } catch (err) {
              toast({ title: "Restore Failed", description: "Invalid backup file.", variant: "destructive" });
          }
      };
      reader.readAsText(file);
      e.target.value = '';
  };

  const PasswordField = ({ id, label, value, onChange, show, setShow, placeholder, icon: Icon, required = false }) => (
    <div className="space-y-2">
        <Label htmlFor={id} className={required ? "text-maroon font-semibold" : ""}>{label}</Label>
        <div className="relative">
            <Icon className={`absolute left-3 top-3 h-4 w-4 ${required ? "text-maroon" : "text-gray-500"}`} />
            <Input
                id={id}
                name={id}
                type={show ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`pl-10 pr-10 ${required ? "border-maroon/20 focus-visible:ring-maroon" : ""}`}
                required={required}
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-maroon/10 rounded-full flex items-center justify-center text-maroon">
            <UserCog className="w-6 h-6" />
        </div>
        <div>
            <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
            <p className="text-gray-500">Manage credentials and data retention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Profile */}
          <Card>
            <CardHeader>
                <CardTitle>Admin Profile</CardTitle>
                <CardDescription>Update login credentials</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="newUsername">Username</Label>
                        <Input
                            id="newUsername"
                            name="newUsername"
                            value={formData.newUsername}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <PasswordField 
                        id="newPassword" 
                        label="New Password" 
                        value={formData.newPassword} 
                        onChange={handleChange} 
                        show={showNewPass} 
                        setShow={setShowNewPass} 
                        placeholder="New password" 
                        icon={Lock} 
                    />
                     <PasswordField 
                        id="confirmPassword" 
                        label="Confirm Password" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        show={showConfirmPass} 
                        setShow={setShowConfirmPass} 
                        placeholder="Confirm new password" 
                        icon={ShieldCheck} 
                    />
                    <div className="pt-4 border-t mt-4">
                        <PasswordField 
                            id="currentPassword" 
                            label="Current Password (Required)" 
                            value={formData.currentPassword} 
                            onChange={handleChange} 
                            show={showCurrentPass} 
                            setShow={setShowCurrentPass} 
                            placeholder="To verify changes" 
                            icon={Lock} 
                            required={true}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading || !formData.currentPassword} className="w-full bg-maroon hover:bg-maroon-dark">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Save Profile
                    </Button>
                </form>
            </CardContent>
          </Card>

          {/* Column 2: Data Management */}
          <Card className="h-fit">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" /> Data Management
                </CardTitle>
                <CardDescription>Backup and restore your entire website content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
                        <p className="font-semibold mb-1">Why Backup?</p>
                        Since this app doesn't use a cloud database yet, all your changes (images, text, properties) are stored in your browser. 
                        <strong> Download a backup regularly</strong> to ensure you don't lose data when clearing cache or switching devices.
                    </div>

                    <Button onClick={handleFullBackup} className="w-full bg-slate-800 hover:bg-slate-900 text-white">
                        <Download className="w-4 h-4 mr-2" /> Download Full Backup
                    </Button>
                </div>

                <div className="pt-6 border-t space-y-4">
                    <h4 className="font-medium text-gray-900">Restore from Backup</h4>
                    <input 
                        type="file" 
                        ref={fileImportRef} 
                        onChange={handleFullRestore} 
                        accept=".json" 
                        className="hidden" 
                    />
                    <Button 
                        variant="outline" 
                        onClick={() => fileImportRef.current?.click()} 
                        className="w-full border-dashed border-2 hover:bg-gray-50"
                    >
                        <Upload className="w-4 h-4 mr-2" /> Upload Backup File
                    </Button>
                    <p className="text-xs text-center text-gray-500">
                        Warning: This will overwrite current data.
                    </p>
                </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
