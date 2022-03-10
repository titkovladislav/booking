import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from "@angular/material/core";
import { FormControl } from "@angular/forms";
import { OverlayContainer } from "@angular/cdk/overlay";
import { DOCUMENT } from "@angular/common";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'room-booking';
  color: ThemePalette = 'warn';
  public themeToggle = new FormControl(false)
  public className = this.document.body.classList
  private unsubscribe$: Subject<void> = new Subject<void>()
  constructor(
    private overlay: OverlayContainer,
    private ref: ElementRef,
    @Inject(DOCUMENT) private document: Document
    ) {
  }

  ngOnInit() {
    this.themeToggle.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((darkMode) => {
        const darkClassName = 'darkMode';
        darkMode ? this.className.add(darkClassName) : this.className.remove(darkClassName)
      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
