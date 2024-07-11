import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QRCodeModule, CommonModule, FormsModule,ReactiveFormsModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front-qr-whatsapp';
  public qrCodeDownloadLink: SafeUrl = '';
  public textToQr!: string;
  public textToQrSingle!:string
  public textToQrWhatsapp!: string;
  public showQr: boolean = false;
  public showQrWhatsapp: boolean = false;
  public whatsappMessage: string = '';
  public whatsappNumber: string = '';
  public width: number = 256;

  constructor() {}
  public transforMessageToWhastappLink() {
    let formatMessage = this.whatsappMessage.replace(/ /g, '%20');
    let phone = this.whatsappNumber;
    let url = `https://wa.me/${phone}/?text=${formatMessage}`;
    this.textToQr = url;
  }

  public onShowQr() {
    this.showQr = false;
    let isEmptyInput = this.textToQrSingle;
    if (
      this.textToQrSingle.trim().length <= 0
    ) {
      this.clearInputs();
    }
    if (isEmptyInput && this.textToQrSingle.trim().length > 0) {
      this.showQr = true;
    }
  }
  public onShowQrWhatsapp() {
    // this.showQrWhatsapp = false;
    this.showQrWhatsapp = false;

    let isEmptyInput = this.whatsappMessage && this.whatsappNumber;
    if (
      this.whatsappMessage.trim().length <= 0 &&
      this.whatsappNumber.trim().length <= 0
    ) {
      this.clearInputs();
    }
    if (isEmptyInput && this.whatsappMessage.trim().length > 0) {
      this.transforMessageToWhastappLink();
      // this.showQrWhatsapp = true;
      this.showQrWhatsapp = true;

    }
  }
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
  clearInputs() {
    this.textToQr = '';
    this.whatsappMessage = '';
    this.whatsappNumber = '';
    this.showQrWhatsapp = false;

  }
  clearInput() {
    this.textToQrSingle = '';
    this.showQr = false;

  }
  copyToClipboard(text: string | null) {
    const textToCopy = text ?? 'Valor predeterminado';
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('Texto copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar el texto: ', err);
    });
  }

}

