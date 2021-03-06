import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ApiAiClient } from "api-ai-javascript";
import { clientConfig } from '../environments/environment'
import { MatDialog } from '@angular/material';
import { UploadFormComponent } from './upload-form/upload-form.component';

export class Chat {
  constructor(private from: 'user' | 'bot', private body: string, private time: number) {
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  messages: Chat[];
  current: 'user' | 'bot';
  value: string;
  client: ApiAiClient;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  constructor(private dialog: MatDialog) {
    this.messages = [];
    this.value = "";
    this.client = new ApiAiClient(clientConfig)
  }

  ngOnInit() {
    this.scrollToBottom();
    window.setTimeout(() => this.openDialog(), 2000);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadFormComponent, {
      width: '75%',
      height: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  async send() {
    if (this.value.length == 0)
      return
    let from = this.current;
    let body = this.value;
    this.value = '';
    this.messages.push(new Chat('user', body, Date.now()));
    this.messages.push(new Chat('bot', await this.chatBotResponse(body), Date.now()))

  }

  async chatBotResponse(text: string): Promise<string> {
    console.log(text)
    const response = await this.client.textRequest(text)
    console.log(response)
    return response.result.fulfillment.speech;
  }


  

}
