
// Website type
export type Website = {
    id:string;
    name: string;
    url: string;
};

// VisitedWebsite type
export type VisitTime = {
    visitDate: Date;
    activityTime: number;
};

export type VisitedWebsite = {
    website: string|Website;
    visitsTime: VisitTime[];
};

export type VisitedWebsites = {
    id:string;
    visitedWebsites: VisitedWebsite[];
};

// User type
export type User = {
    id:string;
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    visitsWebsites: (string| VisitedWebsite)[];
    profiles: string[];
    preferences: string[];
    profileImage?: string;
};

// Profile type
export type ListWebsite = {
    websiteId: string | Website;
    status: 'block' | 'open' | 'limit';
    limitedMinutes: number;
};

export type Profile = {
    id:string;
    userId: string| User;
    profileName: string;
    statusBlockedSites?: 'black list' | 'white list';
    listWebsites: ListWebsite[];
    timeProfile: {
        start: Date;
        end: Date;
    };
};

// Preference type
export type Preference = {
    id:string;
    emailFrequency: 'never' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    sendNotificationTime: number;
    soundVoice?: string;
};

//AuthUser type
export type AuthUser = {
    token?: string,
    user: User;
};
