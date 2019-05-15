<template lang="html">

  <v-layout class="title">
    <v-flex xs12 sm9 offset-sm1>
      <v-card flat tile >
        <v-layout row wrap>
          <v-flex xs12>
            <v-flex xs12 sm10 offset-sm1>

              <v-card-text class="px-0">
                <v-form>
                  <v-container>
                    <v-layout justify-center align-end>
                        <div class="display-3 gdl font-weight-black">GDL</div>
                        <div class="display-3 wlk font-weight-thin">Walks</div>
                    </v-layout>     
                <br>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                        dense
                        v-model="name"
                        :error-messages="nameErrors"
                        label="Nombre Completo"
                        required
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field
                        dense
                        v-model="email"
                        :error-messages="emailErrors"
                        label="Correo Electrónico"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field
                        small
                        v-model="user"
                        :error-messages="userErrors"
                        label="Nombre de Usuario"
                        required
                        @input="$v.user.$touch()"
                        @blur="$v.user.$touch()"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs6>
                        <v-text-field
                        dense
                        v-model="pass"
                        :error-messages="passErrors"
                        :type="show1 ? 'text' : 'password'"
                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                        label="Contraseña"
                        required
                        @input="$v.pass.$touch()"
                        @blur="$v.pass.$touch()"
                        @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs6 >

                        <v-text-field
                        dense
                        v-model="pass2"  
                        :error-messages="pass2Errors"
                        :type="show2 ? 'text' : 'password'"
                        :append-icon="show2 ? 'visibility_off' : 'visibility'"
                        label="Confirma tu Contraseña"
                        required
                        @input="$v.pass2.$touch()"
                        @blur="$v.pass2.$touch()"
                        @click:append="show2 = !show2"
                        ></v-text-field>
                      </v-flex>

                    </v-layout>
                    <br>
                    <v-layout>
                    <v-spacer></v-spacer>
                    <v-btn round dark depressed @click="register()" color="#4b6584">Registrarme</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn round outline to='./' color="#4b6584">Ya tengo cuenta</v-btn>
                    <v-spacer></v-spacer>
                    </v-layout>

                  </v-container>

                </v-form>

              </v-card-text>
            </v-flex>

          </v-flex>
        </v-layout>

      </v-card>

    </v-flex>
  </v-layout>

</template>


<script>
  import axios from 'axios';
  import router from '../router';
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, minLength, alphaNum, not, sameAs} from 'vuelidate/lib/validators'

  const hasNum = (value) =>  {
    if (typeof value === 'undefined' || value === null || value === '') {
      return true
    } return /[0-9]/g.test(value)
  }
  const hasLower = (value) =>  {
    if (typeof value === 'undefined' || value === null || value === '') {
      return true
    } return /[a-z]/g.test(value)
  }
  const hasUpper = (value) =>  {
    if (typeof value === 'undefined' || value === null || value === '') {
      return true
    } return /[A-Z]/g.test(value)
  }
  
  export default {

    mixins: [validationMixin],
    validations: {
      user: { required, maxLength: maxLength(64), minLength: minLength(2) },
      name: { required, maxLength: maxLength(64), minLength: minLength(2) },
      pass: { required, minLength: minLength(10), notAN: not(alphaNum), hasNum, hasUpper, hasLower},
      pass2: { required, sameAs: sameAs('pass') },
      email: { required, email },
    },
    password: 'Password',
    data: () => ({

      user: '',
      name: '',
      show1: false,
      show2: false,
      pass: '',
      pass2: '',
      email: '',
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Este campo debe tener menos de 64 caracteres')
        !this.$v.name.minLength && errors.push('Este campo debe tener al menos de 2 caracteres')
        !this.$v.name.required && errors.push('Este es un campo requerido')
        return errors
      },
      userErrors () {
        const errors = []
        if (!this.$v.user.$dirty) return errors
        !this.$v.user.maxLength && errors.push('Este campo debe tener menos de 64 caracteres')
        !this.$v.user.minLength && errors.push('Este campo debe tener al menos de 2 caracteres')
        !this.$v.user.required && errors.push('Este es un campo requerido')
        return errors
      },
      passErrors () {
        const errors = []
        if (!this.$v.pass.$dirty) return errors
        !this.$v.pass.minLength && errors.push('La contraseña debe tener al menos 10 caracteres')
        !this.$v.pass.hasNum && errors.push('La contraseña debe tener al menos un número')
        !this.$v.pass.hasUpper && errors.push('La contraseña debe tener al menos una mayúscula')
        !this.$v.pass.hasLower && errors.push('La contraseña debe tener al menos una minúscula')
        !this.$v.pass.notAN && errors.push('La contraseña debe tener al menos un caracter especial')
        !this.$v.pass.required && errors.push('Este es un campo requerido')
        return errors
      },
      pass2Errors () {
        const errors = []
        if (!this.$v.pass2.$dirty) return errors
        !this.$v.pass2.required && errors.push('Este es un campo requerido')
        !this.$v.pass2.sameAs && errors.push('Las contraseñas no coinciden')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('El correo electrónico debe tener un formato válido')
        !this.$v.email.required && errors.push('Este es un campo requerido')
        return errors
      }
    },

    methods: {
      register (){
        if(this.$v.$anyError || !this.$v.$anyDirty){
          this.$v.$touch()
        } else {
        axios.post(process.env.VUE_APP_APIURL+'users/signup',
          {
          'username': this.user,
          'email': this.email,
          'password': this.pass
          })
          .then(response => {
            if(response.status === 200){
              router.push('home')
            } 
            })
          .catch()
        }
      }
    }
  }
</script>


<style lang="css">

</style>