output "apim_name" {
  value       = module.apim.name
  description = "Mame of the APIM created"
}

output "apim_vnet_name" {
  value       = azurerm_virtual_network.this.name
  description = "Name of the VNet which houses APIM"
}

output "apim_subnet_name" {
  value       = azurerm_subnet.apim_external_subnet.name
  description = "Name of the subnet which houses APIM"
}
