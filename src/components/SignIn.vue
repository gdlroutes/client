<template lang="html">

  <v-layout  class="title">

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Error</v-card-title>
        <v-card-text>
          Usuario o contraseña incorrectos.
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-flex xs12 sm9 offset-sm1>
      <v-card flat>
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
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                        :error-messages="userErrors"
                        dense
                        v-model="user"
                        label="Nombre de Usuario o Correo"
                        @input="$v.user.$touch()"
                        @blur="$v.user.$touch()"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field
                        dense
                        v-model="pass"
                        :error-messages="passErrors"
                        :type="show1 ? 'text' : 'password'"
                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                        label="Contraseña"
                        @click:append="show1 = !show1"
                        @input="$v.pass.$touch()"
                        @blur="$v.pass.$touch()"
                        ></v-text-field>
                      </v-flex>

                    </v-layout>
                    <br>
                    <v-layout>

                    <v-spacer></v-spacer>
                    <v-btn round dark depressed @click="check2()" color="#4b6584">Iniciar sesión</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn round outline to='./SignUp' color="#4b6584">Crear una cuenta</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn round outline @click="login('https://solid.community')" color="#4b6584">Usar Solid Inrupt</v-btn>
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
  const auth = require('solid-auth-client')
  let solid = {auth}

  
  import axios from 'axios';
  import router from '../router';
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  export default {
     mixins: [validationMixin],
      validations: {
      user: { required},
      pass: { required}
    },
    password: 'Password',
    data: () => ({
      dialog: false,
      user: '',
      show1: false,
      pass: '',
      error: ''
    }),
    mounted(){
      solid.auth.trackSession(session => {
        if (!session){
          console.log('The user is not logged in')
        } else {
          
          let self = this;
          const store = $rdf.graph();
          const me = store.sym(session.webId);
          const profile = me.doc() 
          const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
          const fetcher =new $rdf.Fetcher(store);

          fetcher.load(profile).then(response => {
            let name = store.any(me, VCARD('fn'));
            self.$localStorage.set('username', JSON.stringify(name));
            router.push('home');
          }, err => {
            console.log("Load failed" +  err);
          });
        }
      })
    },
    computed: {
      userErrors () {
        const errors = []
        if (!this.$v.user.$dirty) return errors
        !this.$v.user.required && errors.push('Este es un campo requerido')
        return errors
      },
      passErrors () {
        const errors = []
        if (!this.$v.pass.$dirty) return errors
        !this.$v.pass.required && errors.push('Este es un campo requerido')
        return errors
      }
    },
    methods: {
      async login(idp) {
        let self = this;
        const session = await solid.auth.currentSession();
        if (!session)
          await solid.auth.login(idp);
        else{
          alert(`Logged in with ${session.webId}`);

          const store = $rdf.graph();
          const me = store.sym(session.webId);
          const profile = me.doc() 
          const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
          const fetcher =new $rdf.Fetcher(store);

          fetcher.load(profile).then(response => {
            let name = store.any(me, VCARD('fn'));
            self.$localStorage.set('username', JSON.stringify(name));
            router.push('home');
          }, err => {
            console.log("Load failed" +  err);
          });

          
        }

      },
      check2 () {
        if(this.$v.$anyError || !this.$v.$anyDirty){
          this.$v.$touch()
        } else {
        
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/;
        let body;
        if( re.test(String(this.user).toLowerCase()) ){
          body = {'email': this.user, 'password': this.pass };
        } else {
          body = { 'username': this.user, 'password': this.pass, 'WithCredentials': true };
        }
        axios(process.env.VUE_APP_APIURL+'users/login',
          {
            method: "post",
            data: body,
            withCredentials: true
          })
          .then(response => {
            if(response.status === 200){
              router.push('home');
              
            }
          }).catch(
            x => {
              
              this.dialog = true;
              this.error = x;
              this.user = "";
              this.pass = "";
          }
          );
        }
      }
    }
  }
</script>

<style lang="css">
</style>