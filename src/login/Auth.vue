<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-6 text-center">
        {{ isLogin ? 'Login' : 'Registro' }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <div v-if="!isLogin" class="mb-4">
          <label class="block text-sm font-medium mb-2" for="username">Usuario</label>
          <input v-model="username" type="text" id="username" class="w-full p-2 border rounded-lg" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="email">Correo electrónico</label>
          <input v-model="email" type="email" id="email" class="w-full p-2 border rounded-lg" required />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium mb-2" for="password">Contraseña</label>
          <input v-model="password" type="password" id="password" class="w-full p-2 border rounded-lg" required />
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg">
          {{ isLogin ? 'Iniciar sesión' : 'Registrarse' }}
        </button>
      </form>

      <p class="text-center mt-4">
        <a href="#" @click.prevent="toggleForm" class="text-blue-500">
          {{ isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión' }}
        </a>
      </p>

      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const isLogin = ref(true);
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const router = useRouter();

    const toggleForm = () => {
      isLogin.value = !isLogin.value;
      clearFields();
    };

    const clearFields = () => {
      username.value = '';
      email.value = '';
      password.value = '';
      errorMessage.value = '';
    };

    const handleSubmit = () => {
      if (isLogin.value) {
        loginUser();
      } else {
        registerUser();
      }
    };

    const registerUser = () => {
      const user = {
        username: username.value,
        email: email.value,
        password: password.value,
      };

      const storedUser = localStorage.getItem(email.value);

      if (!storedUser) {
        localStorage.setItem(email.value, JSON.stringify(user));
        clearFields();
        alert('Usuario registrado correctamente');
        isLogin.value = true;
      } else {
        errorMessage.value = 'El usuario ya existe';
      }
    };

    const loginUser = () => {
      const storedUser = JSON.parse(localStorage.getItem(email.value));

      if (storedUser && storedUser.password === password.value) {
        router.push('/home');
      } else {
        errorMessage.value = 'Credenciales incorrectas';
      }
    };

    return {
      isLogin,
      username,
      email,
      password,
      errorMessage,
      toggleForm,
      handleSubmit,
    };
  },
};
</script>
