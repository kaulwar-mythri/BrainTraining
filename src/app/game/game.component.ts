import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Card } from '../card';
import { flipAnimation } from './flip-animation';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  animations: [flipAnimation],
})
export class GameComponent implements OnInit {
  numCards!: number;
  moves: number = 0;
  misses: number = 0;
  roundsPlayed: number = 0;
  showPlayAgainButton: boolean = false;

  gameImages: string[] = [
    "./assets/images/dekisugi.png",
    "./assets/images/doraemon.png",
    "./assets/images/dorami.png",
    "./assets/images/minidoras.jpg",
    "./assets/images/nobisuke.jpg",
    "./assets/images/nobita.png",
    "./assets/images/sensei.png",
    "./assets/images/sewashi.jpg",
    "./assets/images/shizuka.png",
    "./assets/images/suneo.png",
    "./assets/images/takeshi.jpg",
    "./assets/images/tamako.png",
  ];

  selectedImages: string[] = [];

  cards: Card[] = [];

  selectedCards: Card[] = [];

  constructor(private route: ActivatedRoute) {
    this.startGame(this.numCards);
  }

  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        this.numCards = parseInt(params['numCards'] || '6', 10);
        this.startGame(this.numCards);
      });
  }

  startGame(numCards: number) {
    this.selectedImages = this.getRandomImages(numCards);
    this.cards = this.generateCards();
  }

  getRandomImages(count: number): string[] {
    const shuffledImages = this.shuffleArray(this.gameImages);

    return shuffledImages.slice(0, this.numCards/2);
  }

  shuffleArray(arr: any[]): any[] {
    let curIndex = arr.length, randomIndex = 0;

    while(curIndex !== 0) {
      randomIndex = Math.floor(Math.random() * curIndex);
      curIndex--;
    

      [arr[curIndex], arr[randomIndex]] = [arr[randomIndex], arr[curIndex]]
    }

    return arr;
  }

  generateCards(): Card[] {
    const cards: Card[] = [];

    for(let i=0; i<this.selectedImages.length; i++) {
      cards.push({image: this.selectedImages[i], flipped: false, matched: false});
      cards.push({image: this.selectedImages[i], flipped: false, matched: false});
    }
    return this.shuffleArray(cards);
  }

  flipCard(card: Card) {
    if(this.selectedCards.length < 2 && !card.flipped) {
      card.flipped = true;
      this.selectedCards.push(card);

      if(this.selectedCards.length === 2) {
        this.moves++;
        this.checkMatch();
      }
    }
  }

  checkMatch() {
    if (this.selectedCards[0].image === this.selectedCards[1].image) {
      setTimeout(() => {
        this.selectedCards.forEach((card) => {
          card.matched = true;
        });
        this.selectedCards = [];

        if (this.cards.every((card) => card.matched)) {
          this.roundsPlayed++;
          console.log(this.roundsPlayed);
          this.showPlayAgainButton = true;
          
        }
  
      }, 500);
    } else {
      this.misses++;
      setTimeout(() => {
        this.selectedCards.forEach((card) => (card.flipped = false));
        this.selectedCards = [];
      }, 1000);
    }
  }

  playAgain() {
    //problem
    this.moves = 0;
    this.misses = 0;
    this.cards = [];
    this.selectedImages = [];
    this.showPlayAgainButton = false;
    this.startGame(this.numCards);
  }
  
}
