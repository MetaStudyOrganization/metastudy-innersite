import React, { useRef, useState } from 'react';
import Window from '../os/Window';

export interface CreditsProps extends WindowAppProps {}

const Notepad: React.FC<CreditsProps> = (props) => {
    const [text, setText] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleSave = () => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'note.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Window
            top={48}
            left={48}
            width={600}
            height={400}
            windowTitle="Untitled - Notepad"
            windowBarIcon="notepad"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="© 2025 MetaStudy"
        >
            <div style={styles.container}>
                <div style={styles.menuBar}>
                    <span
                        onClick={handleSave}
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                    >
                        File
                    </span>
                    <span>Edit</span>
                    <span>Format</span>
                    <span>View</span>
                    <span>Help</span>
                </div>
                <textarea
                    ref={textAreaRef}
                    style={styles.textArea as React.CSSProperties}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    spellCheck={false}
                />
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    menuBar: {
        display: 'flex',
        gap: 16,
        padding: '4px 8px',
        backgroundColor: '#d4d0c8', // classic Windows gray
        color: 'black',
        fontSize: 14,
        userSelect: 'none',
        borderBottom: '1px solid #a0a0a0',
    },
    textArea: {
        flex: 1,
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        padding: 8,
        fontSize: 14,
        resize: 'none',
        color: 'black',
        backgroundColor: 'white',
        fontFamily: 'Courier New, monospace',
        boxSizing: 'border-box',
    },
};

export default Notepad;
