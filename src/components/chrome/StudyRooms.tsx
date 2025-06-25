import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getData from '../../api/getData';
import sendData from '../../api/sendData';
import background from '../../assets/pictures/backgroundRpg.jpg';

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
    const navigate = useNavigate();

    useEffect(() => {
        getData<StudyRoomsProps[]>('/api/v1/study-group/all').then((res) => {
            setStudyRooms(res);
        });
    }, []);

    const handleJoin = async (groupId: string) => {
        try {
            const res = await sendData<null>(
                'post',
                `/api/v1/study-group/${groupId}`,
                {
                    groupId,
                }
            );
            alert('참여에 성공했습니다!');
        } catch (err: any) {
            alert(err.response?.data?.message || '참여 실패');
            console.error(err);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
            }}
            className={`min-h-screen bg-cover bg-center w-full  text-yellow-100 font-serif flex flex-col items-center p-8 overflow-y-auto`}
        >
            <h1 className="mb-8 text-5xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] tracking-wide border-b-4 border-yellow-300 pb-2">
                🛡️ Welcome to the MetaStudy 🏰
            </h1>

            <div
                className={`${'flex flex-col gap-6 space-between w-full max-w-3xl'}`}
            >
                {studyRooms.map((room) => (
                    <div
                        key={room.groupId}
                        className={`rounded-lg p-6 w-full flex justify-between ${
                            displayMode === 'new'
                                ? 'bg-yellow-950 bg-opacity-70 shadow-2xl border border-yellow-700 mb-6'
                                : 'border-b border-yellow-600 py-4'
                        }`}
                    >
                        <h3 className="text-2xl font-bold text-yellow-200 mb-2">
                            📜 {room.title}
                        </h3>
                        <div className="flex flex-col">
                            <p className="mb-1">
                                <span className="font-semibold">
                                    🗂️ Category:
                                </span>{' '}
                                {room.groupCategory}
                            </p>
                            <p className="mb-1">
                                <span className="font-semibold">
                                    👥 Members:
                                </span>{' '}
                                {room.memberCnt}
                            </p>
                            <p className="mb-4 italic">{room.description}</p>
                        </div>
                        <div className="ml-4 flex gap-4">
                            <button
                                onClick={() =>
                                    navigate(`/study/${room.groupId}`)
                                }
                                className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow-md transition duration-150"
                            >
                                Enter Guild 🏹
                            </button>
                            <button
                                onClick={() => handleJoin(room.groupId)}
                                className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition duration-150 "
                            >
                                View Guild ⚔️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyRooms;
