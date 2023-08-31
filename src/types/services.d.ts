export interface Service {
  name: string
  path: string
  description: string
  icon: string
}

export interface ServiceGroup {
  name: string
  icon: string
  services: Service[]
}
