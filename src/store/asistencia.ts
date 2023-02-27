import { defineStore } from "pinia"
import {  Marcaciones } from '../../app/models/empleado'
import {  buscarRegistros } from '../../app/asistencia'

export const calendarStore = defineStore('calendarStore', {
    state: () => ({ 
      regis:{
        registros:[],
        doc:[],
        ranges:[]
      } as unknown as Marcaciones,
      newdoc:{} as any
      }),
    actions:{
      async agregar(dni:string,mes:number,year:number) {
        this.$state.regis = await buscarRegistros(dni,mes,year)
      }
    }
    // actions: {
    //   addDoc(item:DetalleDocumentos) {
    //     if (this.document.tipo == 'PAPELETA') {
    //       if (this.list.length == 0) {
    //         this.list.push(item)
    //       }
    //     }else{
    //       this.list.push(item)
    //     }
    //   },

    //   removeDoc(index:number){
    //     delete this.list[index]
    //     this.list = this.list.filter((e) => e !== undefined)
    //   },

    //   getObjet():Object {
    //     this.list = this.list.filter((e) => e !== undefined)
    //     return {
    //       ...this.document
    //       ,detalle:[
    //         ...this.list
    //       ]
    //     }
    //   }
    // },


  })