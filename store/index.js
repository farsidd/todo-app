export const state = () => ({
  notes: []
})

export const mutations = {
  populateNotes(state, data) {
    state.notes = data
  },
}
export const actions = {
  async nuxtServerInit({ commit }) {
    await this.$axios.$get('/get/note/all').then((res) => {
      commit('populateNotes', res)

    })
  },
  addTodoNote(context, data) {
    this.$axios.post('/note/add', {
      note_text: data
    }).then((res => {
      this.$axios.$get('/get/note/all').then((res) => {
        context.commit('populateNotes', res)
        this.$toast.success("Note Added Successfully.");
      })

    }))

  },
  updateTodoNote(context, todo) {
    this.$axios.post('/note/update', {
      id: todo.id,
      note_text: todo.new_note_text
    }).then((res => {
      this.$axios.$get('/get/note/all').then((res) => {
        context.commit('populateNotes', res)
        this.$toast.success("Note Updated Successfully.");
      })

    }))
  },
  markTodoNote(context, id) {
    this.$axios.post('/note/mark', {
      id: id,
    }).then((res => {
      this.$axios.$get('/get/note/all').then((res) => {
        context.commit('populateNotes', res)
        this.$toast.info("Note Updated Successfully.");
      })

    }))
  },
  deleteTodoNote(context, id) {
    this.$axios.post('/note/delete', {
      id: id,
    }).then((res => {
      this.$axios.$get('/get/note/all').then((res) => {
        context.commit('populateNotes', res)
        this.$toast.error("Note Deleted Successfully.");
      })

    }))
  }
}
