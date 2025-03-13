import React, { useState, useEffect, useRef } from 'react';
import './Ranking.css';
import dots from './../../assets/427221-200.png';
import coin_icon from './../../assets/JD-09-512.png';
import crown_icon from './../../assets/crown.png';
import crown2_icon from './../../assets/2385856.png';
import cale_icon from './../../assets/calendar-249.png';

const Ranking: React.FC = () => {
    const token: string | null = localStorage.getItem('token');
    interface Member {
        username: string;
        avatar: string;
        coin: number | 0;
    }

    const [loading, setLoading] = useState<boolean>(true);
    const [currentGroup, setCurrentGroup] = useState<string>('');
    const [groupExercise, setGroupExercise] = useState<string>('');
    const [joinInput, setJoinInput] = useState<string>('');
    const [exercise, setExercise] = useState<string>('Push Ups');
    const [days, setDays] = useState<number>(15);
    const [daysLeft, setDaysLeft] = useState<number>();
    const [totalDays, setTotalDays] = useState<number>();
    const [messageC, setMessageC] = useState<string>("");
    const [messageJ, setMessageJ] = useState<string>("");
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [groupMembers, setGroupMembers] = useState<Member[]>([]);
    const [showHidden, setShowHidden] = useState<boolean>(false);
    const hiddenRef = useRef<HTMLDivElement>(null);

    const getUserData = async () => {
        try {
            setLoading(true);
            const userResponse = await fetch(`https://iron-back.onrender.com/user/${token}`);
            const userData = await userResponse.json();
      
            const groupResponse = await fetch(`https://iron-back.onrender.com/user-group/${userData.username}`);
            const groupData = await groupResponse.json();
      
            if (userResponse.ok && groupResponse.ok) {
                setUsername(userData.username);
                setAvatar(userData.avatar);
                setCurrentGroup(groupData.groupId);
                setGroupMembers(groupData.members);
                setGroupExercise(groupData.exercise);
                setDaysLeft(groupData.daysLeft);
                setTotalDays(groupData.totals);
            } else {
                setMessageJ("Error retrieving data");
            }
        } catch (error) {
            console.error("Errore nel recupero dei dati:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getUserData();
    }, []);
    
    const createGroup = async () => {
        try {
        if (days < 15 || days > 90) {
            setMessageC("The challenge must be between 15 and 90 days");
            return;
        }
        const response = await fetch("https://iron-back.onrender.com/create-group", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, exercise, days })
        });
        const data = await response.json();
        if (response.ok) {
            alert(`Group created. ID: ${data.groupId}`);
            setCurrentGroup(data.groupId);
            setGroupExercise(exercise);
        } else {
            alert(data.message);
        }
        } catch (error) {
        setMessageC("Server error");
        }
    };

    const joinGroup = async () => {
        if (!joinInput) {
        setMessageJ("Please enter a valid Group ID");
        return;
        }
        try {
        const response = await fetch("https://iron-back.onrender.com/join-group", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupId: joinInput, username })
        });
        const data = await response.json();
        if (response.ok) {
            setMessageJ("Joined successfully!");
            setCurrentGroup(joinInput);
        } else {
            alert(data.message);
        }
        } catch (error) {
        setMessageJ("Server error");
        }
    };

    const leaveGroup = async () => {
        try {
        const response = await fetch("https://iron-back.onrender.com/leave-group", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
        });
        const data = await response.json();
        if (response.ok) {
            setCurrentGroup('');
            setGroupMembers([]);
            setGroupExercise('');
            setJoinInput('');
            toggleHidden()
        } else {
            alert(data.message);
        }
        } catch (error) {
        setMessageJ("Server error");
        }
    };

    const toggleHidden = () => {
        setShowHidden(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (hiddenRef.current && !hiddenRef.current.contains(event.target as Node)) {
            setShowHidden(false);
        }
        };

        if (showHidden) {
        document.addEventListener('mousedown', handleClickOutside);
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showHidden]);

    const copyGroupId = () => {
        if (currentGroup) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(currentGroup)
            .then(() => {
                alert("Group ID copiato negli appunti!");
            })
            .catch((err) => {
                console.error("Errore durante la copia del Group ID:", err);
            });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = currentGroup;
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
            const successful = document.execCommand('copy');
            if (successful) {
                console.log("Group ID copiato:", currentGroup);
                alert("Group ID copiato negli appunti!");
            } else {
                console.error("Errore: comando copy non riuscito");
            }
            } catch (err) {
            console.error("Errore durante la copia del Group ID:", err);
            }
            document.body.removeChild(textArea);
        }
        }
        toggleHidden();
    };
    

    if (loading) {
        return <div className="ranking"></div>;
    } 

  return (
        <div className="ranking">
        {currentGroup ? (
            <>
            <h3>{groupExercise}</h3>
            <img src={dots} onClick={toggleHidden} className="dots" />
            {showHidden && (
                <div ref={hiddenRef} className="hiddiv">
                <button onClick={copyGroupId}>Copy Group ID</button>
                <hr />
                <button onClick={leaveGroup}>Leave Group</button>
                </div>
            )}
            <div className='lead'>
                {groupMembers
                    .sort((a, b) => b.coin - a.coin)
                    .slice(0, 3)
                    .map((member, index) => {
                        const orderedMembers = [groupMembers[1], groupMembers[0], groupMembers[2]];
                        return (
                            <li key={index}>
                                <div>
                                    {index === 1 && <img src={crown2_icon} className='crown2'/>}
                                    {orderedMembers[index] && <img src={orderedMembers[index].avatar} />}
                                    <h1>{index === 0 ? 2 : index === 1 ? 1 : 3}</h1>
                                    <p>{orderedMembers[index]?.username}</p>
                                </div>
                            </li>
                        );
                    })
                }
            </div>
            <h4>{(totalDays || 0) - (daysLeft || 0)}/{totalDays || 0} <img src={cale_icon} /></h4>
            </>
        ) : (
            <></>
        )}
        {!currentGroup ? (
            <div>
            <h3>Groups</h3>
            <div className="group-options">
                <label>
                Exercise
                <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
                    <option value="Push Ups">Push Ups</option>
                    <option value="Pull Ups">Pull Ups</option>
                    <option value="Dips">Dips</option>
                </select>
                </label>
                <label>
                Duration (days)
                <input 
                    type="number"
                    value={days}
                    min="15"
                    max="90"
                    onChange={(e) => setDays(Number(e.target.value))}
                />
                </label>
                {messageC && <p className="message">{messageC}</p>}
                <button onClick={createGroup}>Create Group</button>
            </div>
            <div className="group-options">
                <div className="or">
                <hr />
                <p>OR</p>
                <hr />
                </div>
                <div className="join-group">
                <input 
                    type="text"
                    placeholder="Enter Group ID"
                    value={joinInput}
                    onChange={(e) => setJoinInput(e.target.value)}
                />
                {messageJ && <p className="message">{messageJ}</p>}
                <button onClick={joinGroup}>Join Group</button>
                </div>
            </div>
            </div>
        ) : (
            <div className="group-members">
            <ul>
                {groupMembers
                .sort((a, b) => b.coin - a.coin)
                .map((member, index) => (
                    <li key={index}>
                        <div>
                            <h1>{index + 1}</h1>
                            <img src={member.avatar} alt={member.username} />
                            <p>{member.username}</p>
                        </div>
                        <span>{member.coin} <img src={coin_icon} alt="coin" /></span>
                    </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
};

export default Ranking;
