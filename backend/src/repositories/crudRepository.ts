/* eslint-disable @typescript-eslint/no-explicit-any */
export default function crudRespository(schema: any) {
  return {
    model: schema,
    async create(data: any) {
      const newDoc = await this.model.create(data)
      return newDoc
    },
    async getAll() {
      const allDocs = await this.model.find()
      return allDocs
    },
    async getById(id: string) {
      const doc = await this.model.findById(id)
      return doc
    },
    async update(id: string, data: any) {
      const updatedDoc = await this.model.findByIdAndUpdate(id, data, {
        new: true
      })
      return updatedDoc
    },
    async delete(id: string) {
      const deletedDoc = await this.model.findByIdAndDelete(id)
      return deletedDoc
    }
  }
}
