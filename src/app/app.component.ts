import { Component } from '@angular/core';
import { ApiAiClient } from "api-ai-javascript";
import { clientConfig } from '../environments/environment'

export class Chat {
  constructor(private from: 'user' | 'bot', private body: string, private time: number) {
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages: Chat[];
  current: 'user' | 'bot';
  value: string;
  client: ApiAiClient;

  constructor() {
    this.messages = [];
    this.value = "";
    this.client = new ApiAiClient(clientConfig)
  }

  async send() {
    if (this.value.length == 0)
      return
    let from = this.current;
    this.messages.push(new Chat('user', this.value, Date.now()));
    this.value = '';
    this.messages.push(new Chat('bot', await this.chatBotResponse(this.value), Date.now()))
  }

  async chatBotResponse(text : string) : Promise<string>{
    const response = await this.client.textRequest(text)
    console.log(response)
    return new Promise<string>(value => 'waaaaa')
  }

}
