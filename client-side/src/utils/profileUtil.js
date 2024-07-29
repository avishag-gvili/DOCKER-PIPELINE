import { createWebsite } from "../services/websiteService";
// profileUtil.js

export const formatProfileData = (profile) => {
    return {
        id: profile._id,
        userId: profile.userId,
        profileName: profile.profileName || 'Default Profile Name',
        timeProfile: {
            timeStart: profile?.timeProfile?.start || '00:00',
            timeEnd: profile?.timeProfile?.end || '00:00'
        },
        statusBlockedSites: profile.statusBlockedSites || 'black list',
        websites: profile.listWebsites.map((website, index) => ({
            index: index,
            websiteId: website.websiteId._id,
            name: website.websiteId.name,
            url: website.websiteId.url,
            status: website.status || 'open',
            limitedMinutes: website.limitedMinutes || 0
        }))
    };
};
export const updateFormDataWithStatusBlockedSites = (formData, value) => {
    const updatedWebsites = formData.websites.map(website => {
        if (website.status === 'limit') {
            return website;
        }
        return {
            ...website,
            status: value === 'black list' ? 'open' : 'block'
        };
    });
    return {
        ...formData,
        statusBlockedSites: value,
        websites: updatedWebsites
    };
};
export const updateFormDataWithWebsite = (formData, website, index) => {
    const updatedWebsites = [...formData.websites];
    const updatedWebsite = {
        ...updatedWebsites[index],
        ...website
    };
    if (website.name === 'url') {
        try {
            const parsedUrl = new URL(website.value);
            updatedWebsite.name = parsedUrl.hostname;
        } catch (error) {
            console.error('Invalid URL:', website.value, error);
        }
    }
    updatedWebsites[index] = updatedWebsite;
    return {
        ...formData,
        websites: updatedWebsites
    };
};
// handleAddUrl.js

export const handleAddUrl = async (data, URLSUser, setURLSUser, setdataToast, setData) => {
  try {
    const parsedUrl = new URL(data.url);
    const dataWebsites = {
      name: parsedUrl.hostname,
      url: data.url
    };
    if (URLSUser.some(item => item.url === data.url)) {
      setdataToast({ open: true, message: 'URL already exists in the list.', type: 'error' });
      return;
    }
    const newWebsites = await createWebsite(dataWebsites);
    setURLSUser([{ id: newWebsites._id, url: data.url, urlStatus: data.urlStatus, urlTimeLimit: data.urlTimeLimit }, ...URLSUser]);
    setData({ ...data, url: '', urlStatus: '', urlTimeLimit: 0 });
  } catch (e) {
    setdataToast({ open: true, message: 'Invalid URL', type: 'error' });
    return null;
  }
};
