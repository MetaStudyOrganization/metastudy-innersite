import { useState } from 'react';
import * as FcIcons from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import sendData from '../../api/sendData';
import Desktop from '../os/Desktop';

interface LoginForm {
    email: string;
    password: string;
    nickname: string;
}

type IconType = React.ComponentType<{ style: React.CSSProperties }>;
const AvatarIcon = FcIcons.FcBusinessman as IconType;

const LoginScreen: React.FC = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const onSubmit = async (data: LoginForm) => {
        try {
            const res: null = await sendData(
                'post',
                '/api/v1/member/login',
                data
            );
            setIsSuccess(true);
            console.log('response:', res);
        } catch (err: any) {
            alert(err.response?.data?.message || '로그인 실패');
            console.error(err);
        }
    };

    return isSuccess ? (
        <Desktop />
    ) : (
        <div style={styles.container}>
            <form style={styles.loginBox} onSubmit={handleSubmit(onSubmit)}>
                <AvatarIcon style={styles.avatar} />
                <div style={styles.username}>로그인</div>

                <input
                    type="text"
                    placeholder="닉네임"
                    {...register('nickname', { required: true })}
                    style={styles.input}
                />
                {errors.nickname && (
                    <span style={styles.error}>닉네임을 입력하세요</span>
                )}

                <input
                    type="email"
                    placeholder="이메일"
                    {...register('email', { required: true })}
                    style={styles.input}
                />
                {errors.email && (
                    <span style={styles.error}>이메일을 입력하세요</span>
                )}

                <input
                    type="password"
                    placeholder="비밀번호"
                    {...register('password', { required: true })}
                    style={styles.input}
                />
                {errors.password && (
                    <span style={styles.error}>비밀번호를 입력하세요</span>
                )}

                <button type="submit" style={styles.loginButton}>
                    로그인
                </button>
            </form>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom right, #008080, #004040)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Tahoma, sans-serif',
    },
    loginBox: {
        backgroundColor: '#e0e0e0',
        border: '2px solid #888',
        borderRadius: 4,
        padding: 32,
        boxShadow: '4px 4px 0px #333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 280,
    },
    avatar: {
        fontSize: 64,
        marginBottom: 16,
    },
    username: {
        fontSize: 18,
        marginBottom: 24,
    },
    input: {
        marginBottom: 12,
        padding: '8px 10px',
        borderRadius: 4,
        border: '1px solid #999',
        width: '100%',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#FEE500',
        color: '#3C1E1E',
        fontWeight: 'bold',
        padding: '10px 16px',
        borderRadius: 6,
        border: 'none',
        cursor: 'pointer',
        fontSize: 16,
        marginTop: 8,
    },
    error: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
};

export default LoginScreen;
