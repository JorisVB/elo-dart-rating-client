import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../models/player';
import { UserService } from '../../services/user-service';
import { ToastController, NavController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { StatsPage } from '../player-stats/player-stats';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html'
})
export class RankingPage implements OnInit {
  players: Player[];
  currentPlayerId: number;

  constructor(private http: HttpClient, private userService: UserService, private toastCtrl: ToastController, private navCtrl: NavController) { }

  ngOnInit(): void {
    this.http.get('http://192.168.192.42:5000/api/player').subscribe(
      (players: any[]) => {
        this.players = players.sort(function (p1: Player, p2: Player) { return p2.rating - p1.rating; });
        console.log(players);
      },
      (error: HttpErrorResponse) => {        
        let toast = this.toastCtrl.create({
          message: error.statusText,
          showCloseButton: true,
          dismissOnPageChange: true
        });
        toast.present();
      }
    );
    this.currentPlayerId = this.userService.currentPlayerId;
  }

  playerTapped(event, player: Player) {    
    this.navCtrl.push(StatsPage, {
      player: player
    });
  }

  ratingClass = (rating) => rating < 1500 ? "negative" : rating > 1500 ? "positive" : "";
}