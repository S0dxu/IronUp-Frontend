import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import dx_arr from './../../assets/arrow-next-svgrepo-com.svg';

const Settings: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const token = localStorage.getItem('token');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const allowedTypes: string[] = ["image/png", "image/jpeg", "image/jpg"];

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    const getUser = async () => {
        try {
<<<<<<< HEAD
            setLoading(true);
            const response = await fetch(`https://iron-back.onrender.com/user/${token}`);
            const data = await response.json();
            if (response.ok) {
                setUsername(data.username);
                setAvatar(data.avatar);
            }
=======
          setLoading(true);
          const response = await fetch(`https://iron-back.onrender.com/user/${token}`);
          const data = await response.json();
      
          if (response.ok) {
            setUsername(data.username);
            setAvatar(data.avatar);
          }
>>>>>>> 820813d0f9d39bf8a355232a112244bbb8bcba11
        } catch (error) {
            console.error("error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            validateFile(selectedFile);
        }
    };

    const validateFile = (file: File) => {
        setLoading(true);
        if (file && allowedTypes.includes(file.type)) {
            setFile(file);
            uploadImage(file)
                .then(link => {
                    console.log(link);
                    setLoading(false);
                    setAvatar(link);
                    changeAvatar(link)
                })
                .catch(error => {
                    console.error("Error uploading image:", error);
                    setLoading(false);
                });
            setError("");
        } else {
            setFile(null);
            setError("Format not supported. Use PNG, JPG or JPEG.");
            setLoading(false);
        }
    };

    const uploadImage = async (imagePath: File): Promise<string> => {
        const clientId = "3b4fd0382862345";
        const url = "https://api.imgur.com/3/upload";
        const headers = {
            "Authorization": `Client-ID ${clientId}`
        };

        const formData = new FormData();
        formData.append('image', imagePath);

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            return data.data.link;
        } else {
            throw new Error('Error uploading image');
        }
    };

    const changeAvatar = async (link: string) => {
      try {
          if (!token) {
              console.error('Token is missing!');
              return;
          }
  
          const response = await fetch(`https://iron-back.onrender.com/change-picture?token=${token}&link=${link}`, {
              method: 'GET',
          });
  
          const data = await response.json();
  
          if (response.ok) {
              console.log('Avatar updated successfully:', data);
              localStorage.setItem('token', data.newToken);

              setAvatar(link);
          } else {
              console.error('Failed to update avatar:', data);
          }
      } catch (error) {
          console.error('Error updating avatar:', error);
      }
  };

  const deleteAccount = async () => {
    try {
        if (!token) {
            console.error("Token is missing");
            return;
        }

        const response = await fetch(`https://iron-back.onrender.com/delete-account?token=${token}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Account deleted successfully:', data);
            logout();
        } else {
            console.error('Failed to delete account:', data);
        }
    } catch (error) {
        console.error('Error deleting account:', error);
    }
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
      setShowDeleteConfirm(false);
  };
  
  if (loading) return <div className="settings"></div>;

  return (
    <div className='settings'>
        <ul>
            <h4>Profile</h4>
            <li>
                <p onClick={() => fileInputRef.current?.click()}>
                    Change Picture <span><img className='fp' src={avatar} /></span><img src={dx_arr} />
                </p>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                    accept="image/png, image/jpeg, image/jpg"
                />
                <p onClick={logout}>Log Out <img src={dx_arr} /></p>
            </li>
            {error && <p className="error">{error}</p>}
        </ul>
        <ul>
            <h4>Help & Settings</h4>
            <li>
                <p>
                    <a href="https://t.me/TristeFare" style={{ textDecoration: 'none', color: 'black' }} target="_blank" rel="noopener noreferrer">
                        Help <img src={dx_arr} alt="Help Icon" />
                    </a>
                </p>
                <p onClick={confirmDelete}>Delete Account <img src={dx_arr} /></p>
            </li>
        </ul>
        {showDeleteConfirm && (
            <div className="delete-confirm-popup">
                <p>Are you sure you want to delete your account?</p>
                <button onClick={deleteAccount}>DELETE THE ACCOUNT</button>
                <button className='cancel' onClick={cancelDelete}>CANCEL</button>
            </div>
        )}
    </div>
  );
};

export default Settings;
