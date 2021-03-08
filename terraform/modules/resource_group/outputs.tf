output "name" {
  value       = azurerm_resource_group.resource_group.name
  description = "Name of the resource group."
}


output "id" {
  value       = azurerm_resource_group.resource_group.id
  description = "ID of the resource group."
}


output "location" {
  value       = azurerm_resource_group.resource_group.location
  description = "Location of the resource group."
}