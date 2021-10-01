output "host" {
  value = azurerm_frontdoor.this.cname
}

output "name" {
  value = azurerm_frontdoor.this.name
}
