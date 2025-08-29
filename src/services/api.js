import { supabase } from './supabase.js';

// Projects API
export const projectsApi = {
  // Get all projects (public + featured GitHub repos)
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { data: null, error: error.message || 'Failed to fetch projects' };
    }
  },

  // Get featured projects only
  async getFeatured() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', true)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return { data: null, error };
    }
  },

  // Create new project (admin only)
  async create(projectData) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating project:', error);
      return { data: null, error };
    }
  },

  // Update project (admin only)
  async update(id, projectData) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating project:', error);
      return { data: null, error };
    }
  },

  // Delete project (admin only)
  async delete(id) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { data: null, error };
    }
  },

  // Sync with GitHub API and update database
  async syncWithGitHub(githubRepos) {
    try {
      const syncPromises = githubRepos.map(async (repo) => {
        // Check if project already exists
        const { data: existing } = await supabase
          .from('projects')
          .select('id, github_repo_id')
          .eq('github_repo_id', repo.id)
          .single();

        const projectData = {
          title: repo.name,
          description: repo.description,
          github_url: repo.html_url,
          technologies: repo.language ? [repo.language] : [],
          github_repo_id: repo.id,
          is_custom: false,
          stars_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
        };

        if (existing) {
          // Update existing project
          return await supabase
            .from('projects')
            .update(projectData)
            .eq('id', existing.id);
        } else {
          // Create new project
          return await supabase
            .from('projects')
            .insert([projectData]);
        }
      });

      await Promise.all(syncPromises);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error syncing with GitHub:', error);
      return { success: false, error };
    }
  }
};

// Skills API
export const skillsApi = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category, name');
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching skills:', error);
      return { data: null, error: error.message || 'Failed to fetch skills' };
    }
  },

  async create(skillData) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([skillData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating skill:', error);
      return { data: null, error: error.message || 'Failed to create skill' };
    }
  },

  async update(id, skillData) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(skillData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating skill:', error);
      return { data: null, error: error.message || 'Failed to update skill' };
    }
  },

  async delete(id) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting skill:', error);
      return { success: false, error: error.message || 'Failed to delete skill' };
    }
  },

  async getByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('category', category)
        .order('name');
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching skills by category:', error);
      return { data: null, error };
    }
  }
};

// Experiences API (Work Experience)
export const experiencesApi = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching experiences:', error);
      return { data: null, error: error.message || 'Failed to fetch experiences' };
    }
  },

  async create(experienceData) {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .insert([experienceData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating experience:', error);
      return { data: null, error: error.message || 'Failed to create experience' };
    }
  },

  async update(id, experienceData) {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .update(experienceData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating experience:', error);
      return { data: null, error: error.message || 'Failed to update experience' };
    }
  },

  async delete(id) {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting experience:', error);
      return { success: false, error: error.message || 'Failed to delete experience' };
    }
  }
};

// Education API
export const educationApi = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('start_year', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching education:', error);
      return { data: null, error: error.message || 'Failed to fetch education' };
    }
  },

  async create(educationData) {
    try {
      const { data, error } = await supabase
        .from('education')
        .insert([educationData])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating education:', error);
      return { data: null, error: error.message || 'Failed to create education' };
    }
  },

  async update(id, educationData) {
    try {
      const { data, error } = await supabase
        .from('education')
        .update(educationData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating education:', error);
      return { data: null, error: error.message || 'Failed to update education' };
    }
  },

  async delete(id) {
    try {
      const { data, error } = await supabase
        .from('education')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting education:', error);
      return { success: false, error: error.message || 'Failed to delete education' };
    }
  }
};

// Profiles API
export const profilesApi = {
  // Get current user profile
  async getProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // Ignore "not found" error
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { data: null, error };
    }
  },

  // Update or create profile
  async upsertProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert([{ id: userId, ...profileData }])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error upserting profile:', error);
      return { data: null, error };
    }
  }
};

// Contact API
export const contactApi = {
  async submitMessage(messageData) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          ...messageData,
          ip_address: null, // You can get this from a service like ipapi.co
          user_agent: navigator.userAgent
        }])
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error submitting contact message:', error);
      return { data: null, error };
    }
  },

  // Admin: Get all messages
  async getMessages() {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return { data: null, error };
    }
  },

  // Admin: Mark message as read
  async markAsRead(id) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error marking message as read:', error);
      return { data: null, error };
    }
  }
};

// Analytics API
export const analyticsApi = {
  async trackEvent(eventType, eventData = {}, pageUrl = window.location.pathname) {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .insert([{
          event_type: eventType,
          event_data: eventData,
          user_session_id: null, // You can implement session tracking
          ip_address: null, // You can get this from a service
          user_agent: navigator.userAgent,
          referrer: document.referrer,
          page_url: pageUrl
        }]);
      
      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error('Error tracking analytics event:', error);
      return { success: false, error };
    }
  },

  async trackPageView(pageUrl = window.location.pathname) {
    return this.trackEvent('page_view', { page: pageUrl }, pageUrl);
  },

  async trackProjectClick(projectId, projectTitle) {
    return this.trackEvent('project_click', { 
      project_id: projectId, 
      project_title: projectTitle 
    });
  },

  async trackContactFormSubmit() {
    return this.trackEvent('contact_form_submit');
  }
};

// Blog API (for future use)
export const blogApi = {
  async getPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { data: null, error };
    }
  },

  async getPostBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      
      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);
      
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return { data: null, error };
    }
  }
};
