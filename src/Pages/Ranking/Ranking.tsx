import React, { useState, useEffect, useRef } from 'react';
import './Ranking.css';
import dots from './../../assets/427221-200.png';
import coin_icon from './../../assets/JD-09-512.png';
import crown_icon from './../../assets/crown.png';
import crown2_icon from './../../assets/2385856.png';
import cale_icon from './../../assets/calendar-249.png';
import dx_arr from './../../assets/arrow-next-svgrepo-com.svg';
import close_icon from './../../assets/75519.png';
import { Navigate, useNavigate } from 'react-router-dom';

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
  const [increment, setIncrement] = useState<number>(1);
  const [startingPoint, setStartingPoint] = useState<number>(1);
  const [daysLeft, setDaysLeft] = useState<number>();
  const [totalDays, setTotalDays] = useState<number>();
  const [messageC, setMessageC] = useState<string>("");
  const [messageJ, setMessageJ] = useState<string>("");
  const [username, setUsername] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [groupMembers, setGroupMembers] = useState<Member[]>([]);
  const [showHidden, setShowHidden] = useState<boolean>(false);
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [createPopupClosing, setCreatePopupClosing] = useState<boolean>(false);
  const [showJoinPopup, setShowJoinPopup] = useState<boolean>(false);
  const [joinPopupClosing, setJoinPopupClosing] = useState<boolean>(false);
  const createPopupRef = useRef<HTMLDivElement>(null);
  const joinPopupRef = useRef<HTMLDivElement>(null);

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
        setGroupMembers(Array.isArray(groupData.members) ? groupData.members : []);
        setGroupExercise(groupData.exercise);
        setDaysLeft(groupData.daysLeft);
        setTotalDays(groupData.totals);
      } else {
        setMessageJ("Error retrieving data");
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPoints = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  useEffect(() => {
    getUserData();
  }, []);

  const navigate = useNavigate()

  const createGroup = async () => {
    try {
      if (days < 15 || days > 90) {
        setMessageC("The challenge must be between 15 and 90 days");
        return;
      }
      const response = await fetch("https://iron-back.onrender.com/create-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, exercise, days, startingPoint, increment })
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentGroup(data.groupId);
        setGroupExercise(exercise);
        closeCreatePopup();
        window.location.reload();
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
        closeJoinPopup();
        window.location.reload();
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
        toggleHidden();
        navigate("/")
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

  const closeCreatePopup = () => {
    setCreatePopupClosing(true);
    setTimeout(() => {
      setShowCreatePopup(false);
      setCreatePopupClosing(false);
    }, 290);
  };

  const closeJoinPopup = () => {
    setJoinPopupClosing(true);
    setTimeout(() => {
      setShowJoinPopup(false);
      setJoinPopupClosing(false);
    }, 290);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hiddenRef.current && !hiddenRef.current.contains(event.target as Node)) {
        setShowHidden(false);
      }
      if (showCreatePopup && !createPopupClosing && createPopupRef.current && !createPopupRef.current.contains(event.target as Node)) {
        closeCreatePopup();
      }
      if (showJoinPopup && !joinPopupClosing && joinPopupRef.current && !joinPopupRef.current.contains(event.target as Node)) {
        closeJoinPopup();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHidden, showCreatePopup, createPopupClosing, showJoinPopup, joinPopupClosing]);

  const copyGroupId = () => {
    if (currentGroup) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(currentGroup)
          .catch((err) => {
            console.error("Error copying Group ID:", err);
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
            console.log("Group ID copied:", currentGroup);
          } else {
            console.error("Error: copy command unsuccessful");
          }
        } catch (err) {
          console.error("Error copying Group ID:", err);
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
          <img src={dots} onClick={toggleHidden} className="dots" alt="options" />
          {showHidden && (
            <div ref={hiddenRef} className="hiddiv">
              <button onClick={copyGroupId}>Copy Group ID</button>
              <hr />
              <button onClick={leaveGroup}>Leave Group</button>
            </div>
          )}
          <div className="lead">
            {groupMembers && groupMembers.length > 1
              ? groupMembers
                  .sort((a, b) => b.coin - a.coin)
                  .slice(0, 3)
                  .map((member, index) => {
                    const orderedMembers = [groupMembers[1], groupMembers[0], groupMembers[2]];
                    return (
                      <li key={index}>
                        <div>
                          {index === 1 && <img src={crown2_icon} className="crown2" alt="crown" />}
                          {orderedMembers[index] && (
                            <img src={orderedMembers[index].avatar} alt={orderedMembers[index].username} />
                          )}
                          <h1>{index === 0 ? 2 : index === 1 ? 1 : 3}</h1>
                          <p>{orderedMembers[index]?.username}</p>
                        </div>
                      </li>
                    );
                  })
              : null}
          </div>
          <div className="group-members">
            <ul>
              {groupMembers.sort((a, b) => b.coin - a.coin).map((member, index) => (
                <li key={index}>
                  <div>
                    <h1>{index + 1}</h1>
                    <img src={member.avatar} alt={member.username} />
                    <p>{member.username}</p>
                  </div>
                  <span>
                    {formatPoints(member.coin)} <img src={coin_icon} alt="coin" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <h3 className="gro">Groups</h3>
          <div className="lead lead-d">
            <div>
              <img src={avatar} />
              <p>{username}</p>
            </div>
          </div>
          <div className="to-crea">
            <p onClick={() => setShowCreatePopup(true)}>
              Create a Group <img src={dx_arr} alt="arrow" />
            </p>
            <p onClick={() => setShowJoinPopup(true)}>
              Join a Group <img src={dx_arr} alt="arrow" />
            </p>
          </div>
        </>
      )}
      {showCreatePopup && (
        <div className="modal-overlay">
          <div className={`modal-content ${createPopupClosing ? 'closing' : ''}`} ref={createPopupRef}>
            <img
              src={close_icon}
              className="close-icon"
              onClick={closeCreatePopup}
            />
            <h3>Create Group</h3>
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
            <label>
              Starting Point ({exercise})
              <input
                type="number"
                value={startingPoint}
                min="1"
                max="100"
                onChange={(e) => setStartingPoint(Number(e.target.value))}
              />
            </label>
            <label>
              Increment ({exercise})
              <input
                type="number"
                value={increment}
                min="1"
                max="20"
                onChange={(e) => setIncrement(Number(e.target.value))}
              />
            </label>
            {messageC && <p className="message">{messageC}</p>}
            <button onClick={createGroup}>Create Group</button>
          </div>
        </div>
      )}
      {showJoinPopup && (
        <div className="modal-overlay">
          <div className={`modal-content ${joinPopupClosing ? 'closing' : ''}`} ref={joinPopupRef}>
            <img
              src={close_icon}
              alt="close"
              className="close-icon"
              onClick={closeJoinPopup}
            />
            <h3>Join Group</h3>
            <input
            className='join-input'
              type="text"
              placeholder="Enter Group ID"
              value={joinInput}
              onChange={(e) => setJoinInput(e.target.value)}
            />
            {messageJ && <p className="message">{messageJ}</p>}
            <button onClick={joinGroup}>Join Group</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ranking;
