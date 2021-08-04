resource "azurerm_key_vault" "key_vault" {
  name                        = "kv-${var.short_location}-${var.environment_prefix}-dh"
  resource_group_name         = var.resource_group_name
  location                    = var.location
  tags                        = merge(map("tf_module_path", "./terraform/modules/key_vault"), var.tags)
  enabled_for_disk_encryption = false
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  purge_protection_enabled    = true
  sku_name                    = "standard"
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = var.principal_id

    secret_permissions = [
      "Get"
    ]
  }
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Set", "Get", "Backup", "Delete", "List", "Purge", "Recover", "Restore"
    ]
  }
}

//audit and metric logging 
resource "azurerm_monitor_diagnostic_setting" "diagnostic_setting" {
  name                       = "monitor-ds-${var.short_location}-${var.environment_prefix}-dh"
  target_resource_id         = azurerm_key_vault.key_vault.id
  log_analytics_workspace_id = var.log_analytics_workspace_id
  log {
    category = "AuditEvent"
    enabled  = true

    retention_policy {
      enabled = true
      days    = 90
    }
  }

  metric {
    category = "AllMetrics"
    enabled  = true
    retention_policy {
      enabled = false
      days    = 90
    }
  }
}

//security alert 

resource "azurerm_monitor_action_group" "slack_webhook" {
  name                = "action-group-${var.short_location}-${var.environment_prefix}-slack-webhook-dh"
  resource_group_name = var.resource_group_name
  short_name          = "tsw-sec-alt"
  tags                = merge(map("tf_module_path", "./terraform/modules/key_vault"), var.tags)
  webhook_receiver {
    name        = "slack-api"
    service_uri = var.slack_security_alert_webhook_url
  }
}

resource "azurerm_monitor_scheduled_query_rules_alert" "query_rules_alert" {
  name                = "query-rules-alert-${var.short_location}-${var.environment_prefix}-slack-dh"
  resource_group_name = var.resource_group_name
  location            = var.location
  tags                = merge(map("tf_module_path", "./terraform/modules/key_vault"), var.tags)
  action {
    action_group           = [azurerm_monitor_action_group.slack_webhook.id]
    custom_webhook_payload = "{\"text\":\"Security Alert!!! Key vault has been accessed by someone/something outside of the allowed azure APIM instance. Please view azure monitor logs for more details.\"}"
  }
  data_source_id = var.log_analytics_workspace_id
  description    = "Alert when there is any secret read access or vault access policy updated"
  enabled        = true

  # Count all keyvault access which are non managed identity access or github deployer principal

  query       = <<-QUERY
  AzureDiagnostics
  | where ResourceProvider == "MICROSOFT.KEYVAULT" 
  and identity_claim_oid_g !in("${var.principal_id}","${data.azurerm_client_config.current.object_id}")
  and (OperationName == "SecretGet"  or OperationName == "VaultPatch")
  | summarize count() by identity_claim_oid_g
  QUERY
  severity    = 0
  frequency   = 5
  time_window = 5
  trigger {
    operator  = "GreaterThan"
    threshold = 0
  }
}
