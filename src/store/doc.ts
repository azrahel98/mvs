import { defineStore } from "pinia"
import { DetalleDocumentos, Documento } from "../../app/models/documentos"

export const userDocsUpload = defineStore('docsUpload', {
    state: () => ({ list:<DetalleDocumentos[]>[],document:<Documento>{} ,dni:''}),
    actions: {
      addDoc(item:DetalleDocumentos) {
        if (this.document.tipo == 'PAPELETA') {
          if (this.list.length == 0) {
            this.list.push(item)
          }
        }else{
          this.list.push(item)
        }
      },

      removeDoc(index:number){
        delete this.list[index]
        this.list = this.list.filter((e) => e !== undefined)
      },

      getObjet():Object {
        this.list = this.list.filter((e) => e !== undefined)
        return {
          ...this.document
          ,detalle:[
            ...this.list
          ]
        }
      }
    },


  })