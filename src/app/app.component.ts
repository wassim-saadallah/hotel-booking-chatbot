import { Component } from '@angular/core';
import { Time } from '@angular/common';


export class Chat{
  constructor(private from: 'user' | 'bot', private body: string, private time: Date){
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages : Chat[];
  current = 'bot';
  value : string;

  constructor(){
    this.messages = [new Chat('bot', 'test', new Date())];
    this.value = "";
  }

  send(){
    let from = this.current;
    this.current = this.current === 'bot' ? 'user' : 'bot';
    this.messages.push(new Chat('bot', this.value, new Date()));
    console.log(this.messages);
  }
}
