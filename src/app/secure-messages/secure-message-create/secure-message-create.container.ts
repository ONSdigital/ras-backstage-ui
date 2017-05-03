import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    template: `
        <h1 class="saturn">Create message</h1>
        <ons-secure-message-form></ons-secure-message-form>
    `,
})
export class SecureMessageCreateContainerComponent { }
