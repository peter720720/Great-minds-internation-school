import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Lock, Mail, User, CreditCard, CheckCircle, LayoutDashboard, ShieldCheck, BookOpen, Library, CalendarDays, ClipboardList, WalletCards, FileText, UserCircle, LogOut, Menu, Camera, Save } from 'lucide-react';

export default function ApplicantPortal() {
    const { user, token, login, logout } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classApplied, setClassApplied] = useState('None');
    const [department, setDepartment] = useState('');
    const [feedback, setFeedback] = useState({ type: '', text: '' });
    const [processing, setProcessing] = useState(false);
    const [activeSection, setActiveSection] = useState('Dashboard');
    const [profileData, setProfileData] = useState({ fullName: user?.fullName || '', email: user?.email || '', phoneNumber: user?.phoneNumber || '', alternateEmail: user?.alternateEmail || '', currentPassword: '', newPassword: '' });
    const [profileImage, setProfileImage] = useState(null);
    const [profileFeedback, setProfileFeedback] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!user) return;
        setProfileData((current) => ({
            ...current,
            fullName: user.fullName || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            alternateEmail: user.alternateEmail || ''
        }));
    }, [user]);

    const availableClasses = [
        'None',
        'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
        'Jss 1', 'Jss 2', 'Jss 3', 'Ss 1', 'Ss 2', 'Ss 3'
    ];
    const isSeniorSecondary = classApplied.startsWith('Ss ');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback({ type: '', text: '' });
        setProcessing(true);

        const endpoint = isSignUp ? '/applicants/signup' : '/applicants/login';
        const payload = isSignUp ? { fullName, email, password, classApplied, department: isSeniorSecondary ? department : '' } : { email, password };

        try {
            const res = await api.post(endpoint, payload);
            if (isSignUp) {
                setFeedback({ type: 'success', text: 'Account created! Please switch to login to enter your profile.' });
                setIsSignUp(false);
            } else {
                login(res.data.profile, res.data.token);
            }
        } catch (err) {
            setFeedback({ type: 'error', text: err.response?.data?.message || 'Portal authentication process dropped.' });
        } finally {
            setProcessing(false);
        }
    };

    const handleMockPayment = async () => {
        setProcessing(true);
        try {
            const mockRef = 'GM-' + Math.floor(Math.random() * 10000000);
            const res = await api.post('/applicants/verify-payment', { reference: mockRef });
            setFeedback({ type: 'success', text: 'Application Processing Fee Logged Successfully!' });
            login(res.data.data, token);
        } catch (err) {
            setFeedback({ type: 'error', text: 'Payment logging interface failure.' });
        } finally {
            setProcessing(false);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setProfileFeedback({ type: '', text: '' });

        const formData = new FormData();
        Object.entries(profileData).forEach(([key, value]) => formData.append(key, value));
        if (profileImage) formData.append('profilePicture', profileImage);

        try {
            const res = await api.put('/applicants/profile', formData);
            login(res.data.profile, token);
            setProfileData((current) => ({ ...current, currentPassword: '', newPassword: '' }));
            setProfileImage(null);
            setProfileFeedback({ type: 'success', text: 'Your profile has been updated.' });
        } catch (err) {
            setProfileFeedback({ type: 'error', text: err.response?.data?.message || 'Profile update failed.' });
        } finally {
            setProcessing(false);
        }
    };

    if (token && user) {
        const dashboardItems = [
            { label: 'Dashboard', icon: LayoutDashboard },
            { label: 'Verify Result', icon: ShieldCheck },
            { label: 'Course Registration', icon: BookOpen },
            { label: 'Bookstore', icon: Library },
            { label: 'Events', icon: CalendarDays },
            { label: 'Results', icon: ClipboardList },
            { label: 'Payments', icon: WalletCards },
            { label: 'Documents', icon: FileText },
            { label: 'Profile', icon: UserCircle }
        ];

        return (
            <div className="min-h-[calc(100vh-106px)] bg-[#e8eef5]">
                <div className="flex min-h-[calc(100vh-106px)] flex-col lg:flex-row">
                    <aside className="w-full shrink-0 bg-white shadow-sm lg:w-60">
                        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 lg:hidden">
                            <span className="font-bold text-school-navy">Student Portal</span>
                            <Menu size={20} className="text-school-navy" />
                        </div>
                        <nav className="flex gap-1 overflow-x-auto p-3 lg:block lg:space-y-1 lg:p-4">
                            {dashboardItems.map(({ label, icon: Icon }) => (
                                <button key={label} onClick={() => setActiveSection(label)} className={`flex min-w-max items-center gap-3 px-3 py-2 text-left text-sm transition lg:w-full ${activeSection === label ? 'bg-school-gold/20 font-semibold text-school-navy' : 'text-gray-600 hover:bg-gray-100 hover:text-school-navy'}`}>
                                    <Icon size={17} />
                                    {label}
                                </button>
                            ))}
                            <button onClick={() => logout('/')} className="flex min-w-max items-center gap-3 px-3 py-2 text-left text-sm text-gray-600 transition hover:bg-gray-100 hover:text-school-navy lg:mt-6 lg:w-full">
                                <LogOut size={17} />
                                Log out
                            </button>
                        </nav>
                    </aside>

                    <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Student Portal</p>
                                <h2 className="text-2xl font-bold text-school-navy">{activeSection}</h2>
                            </div>
                            <div className="hidden items-center gap-3 text-right sm:flex">
                                <div>
                                    <p className="text-sm font-semibold text-school-navy">{user.fullName}</p>
                                    <p className="text-xs text-gray-500">{user.studentId || 'Student ID pending'}</p>
                                </div>
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-school-gold font-bold text-school-navy">
                                    {user.profilePicture ? <img src={user.profilePicture} alt="Student profile" className="h-full w-full rounded-full object-cover" /> : user.fullName?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>

                        {activeSection === 'Dashboard' ? (
                            <div className="space-y-6">
                                <section className="overflow-hidden bg-white shadow-sm">
                                    <div className="relative h-48 md:h-64">
                                        <img src="/Assembly.png" alt="Great Mind International School assembly" className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-school-navy/55" />
                                        <div className="absolute inset-0 flex items-end p-5 md:p-8">
                                            <div className="text-white">
                                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-school-gold">Great Mind International School</p>
                                                <h3 className="mt-1 text-2xl font-bold md:text-3xl">Welcome, {user.fullName}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-white p-5 shadow-sm md:p-7">
                                    <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">
                                        <h3 className="font-bold text-school-navy">Student Profile</h3>
                                        <span className="text-xs text-gray-500">Current academic record</span>
                                    </div>
                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                        <div><p className="text-xs uppercase text-gray-500">Full Name</p><p className="mt-1 font-semibold text-school-navy">{user.fullName}</p></div>
                                        <div><p className="text-xs uppercase text-gray-500">Student ID</p><p className="mt-1 font-semibold text-school-navy">{user.studentId || 'Pending assignment'}</p></div>
                                        <div><p className="text-xs uppercase text-gray-500">Class</p><p className="mt-1 font-semibold text-school-navy">{user.classApplied}</p></div>
                                        <div><p className="text-xs uppercase text-gray-500">Email</p><p className="mt-1 break-words font-semibold text-school-navy">{user.email}</p></div>
                                    </div>
                                </section>

                                <section className="grid gap-6 md:grid-cols-2">
                                    <div className="bg-white p-5 shadow-sm md:p-7">
                                        <h3 className="mb-4 font-bold text-school-navy">Application Status</h3>
                                        <div className="space-y-3 text-sm text-gray-600">
                                            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Account registration secure</div>
                                            <div className="flex items-center gap-2"><CheckCircle size={16} className={user.paymentStatus === 'Paid' ? 'text-green-600' : 'text-gray-400'} /> Processing fee: <strong className={user.paymentStatus === 'Paid' ? 'text-green-700' : 'text-red-600'}>{user.paymentStatus}</strong></div>
                                            <div className="flex items-center gap-2"><CheckCircle size={16} className={user.admissionStatus === 'Approved' ? 'text-green-600' : 'text-gray-400'} /> Admission status: <strong className="text-school-navy">{user.admissionStatus}</strong></div>
                                        </div>
                                        {user.paymentStatus !== 'Paid' && <button onClick={handleMockPayment} disabled={processing} className="mt-6 flex w-full items-center justify-center gap-2 bg-school-gold py-3 text-xs font-bold uppercase tracking-wider text-school-navy hover:bg-school-goldHover disabled:bg-gray-300"><CreditCard size={14} /> Pay Entrance & Application Fee</button>}
                                    </div>
                                    <div className="bg-school-navy p-5 text-white shadow-sm md:p-7">
                                        <p className="text-xs uppercase tracking-wider text-school-gold">Your academic level</p>
                                        <h3 className="mt-2 text-2xl font-bold">{user.classApplied}</h3>
                                        <p className="mt-3 text-sm text-gray-200">Your student identification number is assigned to your school section and will be used for your school records.</p>
                                    </div>
                                </section>
                            </div>
                        ) : activeSection === 'Profile' ? (
                            <form onSubmit={handleProfileSubmit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)]">
                                <section className="bg-white p-6 shadow-sm md:p-8">
                                    <div className="flex flex-col items-center border-b border-gray-200 pb-6">
                                        <div className="relative">
                                            <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-school-cream text-4xl font-bold text-school-navy ring-4 ring-school-gold/30">
                                                {profileImage ? <img src={URL.createObjectURL(profileImage)} alt="Selected student profile" className="h-full w-full object-cover" /> : user.profilePicture ? <img src={user.profilePicture} alt="Student profile" className="h-full w-full object-cover" /> : user.fullName?.charAt(0).toUpperCase()}
                                            </div>
                                            <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-school-gold text-school-navy shadow hover:bg-school-goldHover" title="Upload profile picture">
                                                <Camera size={18} />
                                                <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => setProfileImage(e.target.files?.[0] || null)} />
                                            </label>
                                        </div>
                                        <p className="mt-3 text-xs text-gray-500">PNG or JPG profile picture</p>
                                    </div>

                                    <h3 className="mb-4 mt-6 font-bold text-school-navy">Change Password</h3>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-semibold text-gray-600">Current Password<input type="password" value={profileData.currentPassword} onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })} className="mt-1 w-full border border-gray-300 p-2.5 text-sm focus:border-school-navy focus:outline-none" /></label>
                                        <label className="block text-xs font-semibold text-gray-600">New Password<input type="password" value={profileData.newPassword} onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })} className="mt-1 w-full border border-gray-300 p-2.5 text-sm focus:border-school-navy focus:outline-none" /></label>
                                    </div>
                                </section>

                                <section className="bg-white p-6 shadow-sm md:p-8">
                                    <div className="mb-5 border-b border-gray-200 pb-3">
                                        <h3 className="font-bold text-school-navy">Personal Details</h3>
                                        <p className="mt-1 text-xs text-gray-500">Keep your student contact information up to date.</p>
                                    </div>
                                    {profileFeedback.text && <div className={`mb-4 p-3 text-sm ${profileFeedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{profileFeedback.text}</div>}
                                    <div className="space-y-4">
                                        <label className="block text-xs font-semibold text-gray-600">Full Name<input type="text" value={profileData.fullName} onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })} className="mt-1 w-full border border-gray-300 p-2.5 text-sm focus:border-school-navy focus:outline-none" required /></label>
                                        <label className="block text-xs font-semibold text-gray-600">Email Address<input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} className="mt-1 w-full border border-gray-300 p-2.5 text-sm focus:border-school-navy focus:outline-none" required /></label>
                                        <label className="block text-xs font-semibold text-gray-600">Phone Number<input type="tel" value={profileData.phoneNumber} onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })} className="mt-1 w-full border border-gray-300 p-2.5 text-sm focus:border-school-navy focus:outline-none" /></label>
                                        <label className="block text-xs font-semibold text-gray-600">Alternate Email Address<input type="email" value={profileData.alternateEmail} onChange={(e) => setProfileData({ ...profileData, alternateEmail: e.target.value })} className="mt-1 w-full border border-gray-300 p-2.5 text-sm focus:border-school-navy focus:outline-none" /></label>
                                    </div>

                                    <h3 className="mb-4 mt-8 border-b border-gray-200 pb-3 font-bold text-school-navy">Academic Details</h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div><p className="text-xs font-semibold text-gray-500">Student ID</p><p className="mt-1 text-sm text-school-navy">{user.studentId || 'Pending assignment'}</p></div>
                                        <div><p className="text-xs font-semibold text-gray-500">Class</p><p className="mt-1 text-sm text-school-navy">{user.classApplied}</p></div>
                                    </div>
                                    <button type="submit" disabled={processing} className="mt-8 flex w-full items-center justify-center gap-2 bg-school-navy py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-school-navyLight disabled:bg-gray-400"><Save size={16} /> {processing ? 'Saving Profile...' : 'Save Changes'}</button>
                                </section>
                            </form>
                        ) : (
                            <section className="bg-white p-8 text-center shadow-sm">
                                <h3 className="text-xl font-bold text-school-navy">{activeSection}</h3>
                                <p className="mt-2 text-sm text-gray-500">This student portal section is ready for school updates.</p>
                            </section>
                        )}
                    </main>
                </div>
            </div>
        );
    }

    // ANONYMOUS ACCESS VIEW GATEWAY (SIGNUP / LOGIN INTERACTION)
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded shadow-md w-full max-w-md border-t-4 border-school-navy p-8">
                <div className="text-center mb-6">
                    <GraduationCap size={40} className="text-school-gold mx-auto mb-2" />
                    <h2 className="text-xl font-bold uppercase text-school-navy">{isSignUp ? 'Admission Registry' : 'Applicant Login'}</h2>
                    <p className="text-xs text-gray-400">Great Mind International Student Application Portal</p>
                </div>

                {feedback.text && (
                    <div className={`p-3 text-xs font-bold rounded mb-4 ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        {feedback.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Student Full Name</label>
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border p-2.5 pl-10 rounded text-sm focus:outline-school-navy" placeholder="John Doe" required />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2.5 pl-10 rounded text-sm focus:outline-school-navy" placeholder="student@example.com" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Portal Secure Password</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2.5 pl-10 rounded text-sm focus:outline-school-navy" placeholder="••••••••" required />
                        </div>
                    </div>

                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Applying For Academic Class</label>
                                <select value={classApplied} onChange={(e) => { setClassApplied(e.target.value); if (!e.target.value.startsWith('Ss ')) setDepartment(''); }} className="w-full border p-2.5 rounded text-sm bg-white focus:outline-school-navy font-medium">
                                {availableClasses.map((cls) => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {isSignUp && isSeniorSecondary && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Senior Secondary Department</label>
                            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full border p-2.5 rounded text-sm bg-white focus:outline-school-navy font-medium" required>
                                <option value="">Select a department</option>
                                <option value="Science">Science</option>
                                <option value="Art">Art</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" disabled={processing} className="w-full bg-school-navy text-white text-xs font-bold uppercase py-3 rounded tracking-wider shadow hover:bg-school-navy/90 transition">
                        {processing ? 'Processing Server Route...' : isSignUp ? 'Create Application Account' : 'Authenticate Account'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-xs text-school-gold hover:underline font-semibold">
                        {isSignUp ? 'Already registered? Log in here' : 'Fresh Student? Register for Admissions Account here'}
                    </button>
                </div>
            </div>
        </div>
    );
}