import { CoverComponent }                         from "src/app/cover.component"

export class CoRouter {

  coverComp: CoverComponent

  registerCover(comp: CoverComponent) {
    this.coverComp = comp
  }

  getCover(): CoverComponent {
    return this.coverComp
  }
}