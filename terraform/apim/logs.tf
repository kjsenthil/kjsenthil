// NSG Logs
resource "azurerm_storage_account" "nsg_logs" {
  name                     = "st${local.short_location}tsw${var.environment_prefix}dhnsglogs"
  resource_group_name      = data.azurerm_resource_group.resource_group.name
  location                 = data.azurerm_resource_group.resource_group.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
  tags                     = merge(var.tags, local.default_tags)
}

resource "azurerm_log_analytics_workspace" "log_analytics" {
  name                = "loganalytics${local.short_location}tsw${var.environment_prefix}dh"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_network_watcher" "network_watcher" {
  name                = "nw${local.short_location}tsw${var.environment_prefix}dh"
  resource_group_name = data.azurerm_resource_group.resource_group.name
  location            = data.azurerm_resource_group.resource_group.location
}

resource "azurerm_network_watcher_flow_log" "nsg_flow_log" {
  network_watcher_name = azurerm_network_watcher.network_watcher.name
  resource_group_name  = data.azurerm_resource_group.resource_group.name

  network_security_group_id = azurerm_network_security_group.apim_security_group.id
  storage_account_id        = azurerm_storage_account.nsg_logs.id
  enabled                   = true

  retention_policy {
    enabled = true
    days    = 7
  }

  traffic_analytics {
    enabled               = true
    workspace_id          = azurerm_log_analytics_workspace.log_analytics.workspace_id
    workspace_region      = azurerm_log_analytics_workspace.log_analytics.location
    workspace_resource_id = azurerm_log_analytics_workspace.log_analytics.id
    interval_in_minutes   = 10
  }
}