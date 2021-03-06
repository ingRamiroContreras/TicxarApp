import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user').subscribe(
        (data) => this.setAuth(data.user),
        (err) => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }
  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  setAuthTicxar(token: string) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
    // Set current user data into observable
    //this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = type === 'login' ? '/login' : '';
    return this.apiService.post('/users' + route, { user: credentials }).pipe(
      map((data) => {
        this.setAuth(data.user);
        return data;
      })
    );
  }

  attemptAuthTicxar(type, credentials): Observable<User> {
    const route = type === 'login' ? '/token/' : '';
    console.log("prueba si cambio y esta correcto")
    return this.apiService
    .postLogin(
      route +
          `?grant_type=password&username=${credentials.email}&password=${credentials.password}`
    )
    .pipe(
      map((data) => {
        console.log("token", data.access_token)
        this.setAuthTicxar(data.access_token);
        return data;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService.put('/user', { user }).pipe(
      map((data) => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }

  data(userId: Number): Observable<any>  {
    if (this.jwtService.getToken()) {
      return this.apiService.get('/employees/v1/'+userId).pipe(
        map((data) => {
          return data;
        })
      );
    } else {
      this.purgeAuth();
    }
  }

  dataRickAndMorty(userId: Number): Observable<any>  {
    if (this.jwtService.getToken()) {
      return this.apiService.getRickAndMorty('https://rickandmortyapi.com/api/character/'+userId).pipe(
        map((data) => {
          return data;
        })
      );
    } else {
      this.purgeAuth();
    }
  }
}
