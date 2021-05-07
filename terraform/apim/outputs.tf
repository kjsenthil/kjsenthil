output "apim_name" {
  value       = module.apim.name
  description = "Mame of the APIM created"
}

output "apim_subnet_id" {
  value       = azurerm_subnet.apim_external_subnet.id
  description = "ID of the subnet which houses APIM"
}
