import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // armazena os dados do usuário autenticado
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(credentials) {
      try {
        const { data } = await api.post('/auth/login', credentials);
        this.user = data.user; // armazena o usuáario autenticado no estado
      } catch (e) {
        const { message } = e.response.data;
        throw new Error(message);
      }
    },

    async logout() {
      try {
        await api.post('/auth/logout');
        this.user = null;
      } catch (e) {
        console.log('Erro ao realizar o logout: ', e.response?.data);
      }
    },

    async fetchUser() {
      try {
        const { data } = await api.get('/user/profile');
        this.user = data;
      } catch (e) {
        console.log('Erro ao buscar perfil: ', e.response?.data);
        this.user = null;
      }
    },
  },
});
