/* eslint-disable @typescript-eslint/no-explicit-any */
export default function crudRespository(model: any) {
  return {
    async create(data: any) {
      const newDoc = await model.create(data)
      return newDoc
    },
    async getAll() {
      const allDocs = await model.find()
      return allDocs
    },
    async getById(id: string) {
      const doc = await model.findById(id)
      return doc
    },
    async update(id: string, data: any) {
      const updatedDoc = await model.findByIdAndUpdate(id, data, {
        new: true
      })
      return updatedDoc
    },
    async delete(id: string) {
      const deletedDoc = await model.findByIdAndDelete(id)
      return deletedDoc
    }
  }
}
