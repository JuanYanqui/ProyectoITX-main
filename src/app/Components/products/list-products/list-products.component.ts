import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { finalize } from 'rxjs/operators';
import { Empresa } from '../../../Models/Empresa';
import { UsuarioService } from '../../../Services/usuario.service';
import { Producto } from '../producto';
import { ProductosService } from '../productos.service';
import * as FileSaver from 'file-saver';
declare module 'file-saver';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ListProductsComponent implements OnInit {
  @Input() imageLoader: any;
  @Input() member: number = 0;

  loading: boolean = true;
  arraySelected:any;
  empresa = new Empresa();
  arrayExcel:any;
  loaded = false;
  productos: Producto[] = [];
  selectedId = 0;
    showMe!: boolean;

  constructor(
    private usuariosService: UsuarioService,
    public domSanitizer: DomSanitizer,
    private productoService: ProductosService
  ) {}

  obtenerEmpresa() {
    let idUsuario = localStorage.getItem('idUsuario');
    this.usuariosService.getPorId(idUsuario).subscribe({
      next: (data) => {
        this.empresa = data.empresa!;
      },
      error: (error) => console.log(error),
      complete: () => this.obtenerProdctos(),
    });
  }

  obtenerProdctos() {
    this.productoService
      .getProductsByEmpresa2(this.empresa.idEmpresa)
      .pipe(
        finalize(() => {
          this.loaded = true;
          this.loading = false;
        })
      )
      .subscribe({
        next: (producto) => (this.productos = producto),
        error: (err) => {
          console.log(err.message);
        },
      });
  }
  ngOnInit(): void {
    this.obtenerEmpresa();
  }
  extractData(datosTabla:any){
    console.log(datosTabla)
    return datosTabla.map((row:any) => [row.id||" ",row.id_proveedor||" ",row.nombre||" ",row.descripcion||" ",row.marca||" ",row.calidad||" ",row.categoria||" ",row.peso||" ",row.oferta_descuento||" ",row.precio_compra||" ",row.precio_venta||" ",row.estado||" "]);
  }
  async generaraPDF(){
    if(this.arraySelected<=0){
      alert("Seleccione todos los productos para poder generara el pdf")
    }else{
   console.log(this.arraySelected)
    const pdf = new PdfMakeWrapper();
    pdf.pageOrientation('landscape')
    pdf.pageSize('A3')
    pdf.add(pdf.ln(2))
    pdf.add(new Txt("Reporte Producto").bold().italics().alignment('center').end);
    pdf.add(pdf.ln(2))
    pdf.add(new Table([
      ['ID','Proveedor','Nombre','Descripción','Marca','Calidad','Categoria','Peso neto','Oferta descuento','Precio compra','Precio venta','Estado'],
      ]).widths(['*','*','*','*','*','*','*','*','*','*','*','*']).layout(
        {
          fillColor:(rowIndex?:number, node?:any, columnIndex?:number)=>{
            return rowIndex ===0 ? '#CCCCCC': '';
          }
        }
      ).end)
      pdf.add(new Table([
        ...this.extractData(this.arraySelected)
      ]).widths('*').end)

  pdf.create().open();
  }}
  exportSelectedX() {
    if (this.arraySelected.length < 1) {
      alert('Por favor seleccione al menos un producto')
    } else {
      for (let i = 0; i < this.arraySelected.length; i++) {
        let nuevoUserE = this.arraySelected[i]||+" ";
        if(nuevoUserE==null || nuevoUserE==undefined)
          nuevoUserE=""
        const usuarioImprimirSelected = {
          cedula:nuevoUserE.id,
           id_proveedor:nuevoUserE.id_proveedor,
           nombre:nuevoUserE.nombre,
           descripcion:nuevoUserE.descripcion,
           marca:nuevoUserE.marca,
           calidad:nuevoUserE.calidad,
           categoria:nuevoUserE.categoria,
           peso:nuevoUserE.peso,
           oferta_descuento:nuevoUserE.oferta_descuento,
           precio_compra:nuevoUserE.precio_compra,
           precio_venta:nuevoUserE.precio_venta,
           estado:nuevoUserE.estado
        }
        this.arrayExcel.push(usuarioImprimirSelected||"");
        console.log(this.arrayExcel)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.arrayExcel);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Usuarios");
      });
    }
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    location.reload();
  }
}
