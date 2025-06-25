import React, { useEffect, useRef, useState } from 'react';
import Window from '../os/Window';
import { FilesetResolver, FaceDetector } from '@mediapipe/tasks-vision';
// @ts-ignore
import faceDetectionShortRange from '../../model/blaze_face_short_range.tflite';

export interface FaceDetectAppProps extends WindowAppProps {}

const FaceDetectApp: React.FC<FaceDetectAppProps> = (props) => {
    const [width, setWidth] = useState(640);
    const [height, setHeight] = useState(480);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [faceDetected, setFaceDetected] = useState(false);

    useEffect(() => {
        let detector: any;
        let animationId: number;

        const load = async () => {
            const filesetResolver = await FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
            );

            detector = await FaceDetector.createFromOptions(filesetResolver, {
                baseOptions: {
                    modelAssetPath: faceDetectionShortRange,
                },
                runningMode: 'VIDEO',
            });

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            const video = videoRef.current!;
            video.srcObject = stream;
            await video.play();

            const detect = async () => {
                const results = await detector.detectForVideo(
                    video,
                    performance.now()
                );
                setFaceDetected(results.detections.length > 0);
                animationId = requestAnimationFrame(detect);
            };

            detect();
        };

        load();

        return () => {
            cancelAnimationFrame(animationId);
            const tracks = (
                videoRef.current?.srcObject as MediaStream
            )?.getTracks();
            tracks?.forEach((t) => t.stop());
        };
    }, []);

    return (
        <Window
            top={50}
            left={50}
            width={width}
            height={height + 60}
            windowTitle="Face Detector"
            windowBarColor="#222"
            windowBarIcon="doomIcon"
            bottomLeftText={faceDetected ? '🟢 사람 있음' : '🔴 사람 없음'}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
        >
            <div style={{ position: 'relative', width: width, height: height }}>
                <video
                    ref={videoRef}
                    width={width}
                    height={height}
                    autoPlay
                    muted
                    playsInline
                    style={{ objectFit: 'cover', border: '1px solid black' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        padding: '4px 8px',
                        fontSize: 14,
                        borderRadius: 4,
                    }}
                >
                    {faceDetected ? '사람이 감지됨' : '사람 없음'}
                </div>
            </div>
        </Window>
    );
};

export default FaceDetectApp;
