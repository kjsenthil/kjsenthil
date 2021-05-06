output "resource_group_name" {
  value       = azurerm_resource_group.resource_group.name
  description = "The name of this resource group."
}

output "location" {
  value       = azurerm_resource_group.resource_group.location
  description = "The location in which this resource group is deployed."
}
