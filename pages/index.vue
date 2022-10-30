<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-toolbar elevation="0" color="blue">
          <v-toolbar-title class="headline">Todo App</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line subheader>
          <v-subheader class="headline">{{ day }}, {{ date }}{{ ord }} {{ year }}</v-subheader>
          <p class="mx-12 text-right"><b>{{ todoNotes.length }}</b> Tasks</p>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>

                <v-text-field v-model="newTodoNote" id="newTodoNote" name="newTodoNote" label="Type your task"
                  @keyup.enter="addTodo()" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

        <v-list subheader two-line flat>
          <v-subheader class="subheading" v-if="todoNotes.length == 0">You have 0 Tasks, add some</v-subheader>
          <v-subheader class="subheading" v-else>Your Tasks</v-subheader>

          <v-list-item-group>
            <v-list-item v-for="todo in $store.state.notes" :key="todo.id">


              <v-list-item-content>
                <v-list-item-title :class="{ isCompleted: todo.isCompleted }">{{ todo.note_text | capitalize }}
                </v-list-item-title>
                <v-list-item-subtitle>Added on: {{ date }}{{ ord }} {{ day }} {{ year }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-btn-toggle rounded>
                <v-btn>
                  <v-icon @click="editTodoNote(todo)" color="blue">mdi-file-document-edit</v-icon>
                </v-btn>
                <v-btn>
                  <v-icon @click="markCompleted(todo.id)" color="green">mdi-checkbox-marked</v-icon>
                </v-btn>
                <v-btn>
                  <v-icon color="red" @click="deleteTodoNote(todo.id)">mdi-delete</v-icon>
                </v-btn>

              </v-btn-toggle>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>

    <!-- //CRUD dialogue of actions buttons -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field v-model="editedData.new_note_text"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeTodoNote">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateTodoNote()">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
// import { todoNotestore } from '@/store/todoNotestore'
export default {
  name: 'IndexPage',
  data() {
    return {
      editedData: {
        id: '',
        new_note_text: ''
      },
      isDark: true,
      show: true,
      newTodoNote: "",
      todoNotes: [],
      day: this.todoDay(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear(),
      toggle_exclusive: undefined,
      dialog: false,
      updatedTodoNote: {},
      editedIndex: '',
      id: 0,
      snackbar: false
    }
  },
  mounted() {
    this.todoNotes = this.$store.state.notes
  },
  methods: {
    addTodo() {
      this.$store.dispatch('addTodoNote', this.newTodoNote)
    },

    deleteTodoNote(id) {
      this.$store.dispatch('deleteTodoNote', id)
    },
    markCompleted(id) {
      this.$store.dispatch('markTodoNote', id)
    },
    editTodoNote(todo) {
      this.editedData.id = todo.id
      this.editedData.new_note_text = todo.note_text
      this.dialog = true
    },
    updateTodoNote() {
      this.$store.dispatch('updateTodoNote', this.editedData)
      this.dialog = false
    },
    closeTodoNote() {
      this.dialog = false
    },

    todoDay() {
      const d = new Date();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      return days[d.getDay()];
    },

    nth(d) {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }
  },

  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
}

</script>
<style scoped>
.isCompleted {
  text-decoration: line-through;
}
</style>
