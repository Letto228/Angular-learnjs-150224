import {Component} from '@angular/core'
import {APP_CONFIG} from '../../app.constants'
import {IAppConfig} from '../../shared/interfaces/app.interfaces'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public appConfig: IAppConfig
  constructor() {
    this.appConfig = APP_CONFIG
  }
}
