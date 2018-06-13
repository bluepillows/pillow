import { CoverComponent }                         from "src/app/cover.component"

export class CoRouter {

  private coverComp: CoverComponent

  registerCover(comp: CoverComponent) {
    this.coverComp = comp
  }

  getCover(): CoverComponent {
    return this.coverComp
  }
}