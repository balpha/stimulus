import { Scope } from "@stimulus/core"
import { Request } from "@stimulus/http"

export class Resource {
  readonly scope: Scope

  constructor(scope: Scope) {
    this.scope = scope
  }

  get bootstrapRequest() {
    return new Request("get", this.bootstrapUrl)
  }

  get createRequest() {
    return new Request("post", this.url, { body: this.formData })
  }

  get editRequest() {
    return new Request("get", this.editUrl)
  }

  get showRequest() {
    return new Request("get", this.url)
  }

  get updateRequest() {
    return new Request("put", this.url, { body: this.formData })
  }

  get destroyRequest() {
    return new Request("delete", this.url)
  }

  get shouldBootstrapContents() {
    return this.data.has("bootstrapUrl")
      || this.data.has("bootstrap")
  }

  get bootstrapUrl() {
    return this.data.get("bootstrapUrl")
      || this.url
  }

  get url() {
    return this.data.get("url")
      || this.element.getAttribute("href")
      || this.element.getAttribute("action")
      || ""
  }

  get editUrl() {
    return this.data.get("editUrl")
      || `${this.url}/edit`
  }

  get formData() {
    if (this.formTarget instanceof HTMLFormElement) {
      return new FormData(this.formTarget)
    }
  }

  get data() {
    return this.scope.data
  }

  get element() {
    return this.scope.element
  }

  get formTarget() {
    return this.targets.find("form") || this.element
  }

  get primaryFieldTarget() {
    return (this.targets.find("primaryField") || this.element) as HTMLElement
  }

  get targets() {
    return this.scope.targets
  }
}
