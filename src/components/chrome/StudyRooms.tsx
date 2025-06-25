import React, { useEffect, useState } from 'react';
import me from '../../assets/pictures/workingAtComputer.jpg';
import meNow from '../../assets/pictures/currentme.jpg';
import { Link } from 'react-router-dom';
import getData from '../../api/getData';

export interface StudyRoomsProps {
    description: string;
    groupCategory: string;
    groupId: string;
    memberCnt: number;
    title: string;
}

const StudyRooms: React.FC = () => {
    const [studyRooms, setStudyRooms] = useState<StudyRoomsProps[]>([]);
    const [displayMode, setDisplayMode] = useState<'old' | 'new'>('new');

    useEffect(() => {
        getData<StudyRoomsProps[]>('/api/v1/study-group/all').then((res) => {
            setStudyRooms(res);
        });
    }, []);

    return (
        <div className="site-page-content" style={{ padding: 16 }}>
            <h1 style={styles.contentHeader}>Welcome to Study Rooms</h1>
            <button
                onClick={() =>
                    setDisplayMode(displayMode === 'new' ? 'old' : 'new')
                }
                style={{
                    marginBottom: 20,
                    padding: '8px 16px',
                    cursor: 'pointer',
                    borderRadius: 6,
                    border: '1px solid #333',
                    backgroundColor: '#fff',
                }}
            >
                Switch to {displayMode === 'new' ? 'Old' : 'New'} View
            </button>

            <div
                style={
                    displayMode === 'new'
                        ? styles.studyRoomContainerNew
                        : styles.studyRoomContainerOld
                }
            >
                {studyRooms.map((room) => (
                    <div
                        key={room.groupId}
                        style={
                            displayMode === 'new'
                                ? styles.studyRoomCardNew
                                : styles.studyRoomCardOld
                        }
                    >
                        <h3>{room.title}</h3>
                        <p>
                            <strong>Category:</strong> {room.groupCategory}
                        </p>
                        <p>
                            <strong>Members:</strong> {room.memberCnt}
                        </p>
                        <p>{room.description}</p>
                        <Link to={`/study/${room.groupId}`}>View Group</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    contentHeader: {
        marginBottom: 16,
        fontSize: 48,
    },
    image: {
        height: 'auto',
        width: '100%',
    },
    topImage: {
        height: 'auto',
        width: '100%',
        marginBottom: 32,
    },
    verticalImage: {
        alignSelf: 'center',
        marginLeft: 32,
        flex: 0.8,
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
    studyRoomContainerNew: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 24,
        marginTop: 24,
    },
    studyRoomCardNew: {
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#f5f7fa',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    studyRoomContainerOld: {
        display: 'block',
        marginTop: 24,
    },
    studyRoomCardOld: {
        borderBottom: '1px solid #ccc',
        padding: '16px 0',
    },
};

export default StudyRooms;
