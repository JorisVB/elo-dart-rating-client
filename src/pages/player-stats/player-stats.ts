import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavParams } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Player } from '../../models/player';
import { Stats } from '../../models/stats';

@Component({
    selector: 'page-stats',
    templateUrl: 'player-stats.html'
})
export class StatsPage implements OnInit {
    player: Player;
    stats: Stats[];
    period: string;
    periods: string[];

    constructor(
        private http: HttpClient,
        private toastCtrl: ToastController,
        private navParams: NavParams) { }

    ngOnInit(): void {
        this.player = <Player>this.navParams.data['player'];
        const playerId = this.player.id;
        this.http.get(`http://192.168.192.42:5000/api/stats/${playerId}`).subscribe(
            (stats: Stats[]) => {
                console.log(stats);
                this.stats = stats;
                this.periods = this.stats.map(s => s.period);
                this.period = this.periods[0];
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
    }

    statsPct = (won, lost) => won + lost === 0 ? '-' : Math.round((won / (won + lost)) * 100);

    orderedMatchStats = (matchStats) => matchStats.sort((m1, m2) => (m2.lost + m2.won) - (m1.lost + m1.won));
}