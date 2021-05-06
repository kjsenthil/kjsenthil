#---------------------------------------------------------
# Local declarations
#----------------------------------------------------------
locals {
  account_tier              = (var.account_kind == "FileStorage" ? "Premium" : split("_", var.sku)[0])
  account_replication_type  = (local.account_tier == "Premium" ? "LRS" : split("_", var.sku)[1])
  if_static_website_enabled = var.enable_static_website ? [{}] : []
  tags = merge(var.tags, {
    Code = "digital-hybrid//terraform/modules/static_website"
  })
}

#---------------------------------------------------------
# Storage Account Creation and enable static website
#----------------------------------------------------------
resource "azurerm_storage_account" "storeacc" {
  name                      = var.storage_account_name
  resource_group_name       = var.resource_group_name
  location                  = var.location
  account_kind              = var.account_kind
  account_tier              = local.account_tier
  account_replication_type  = local.account_replication_type
  enable_https_traffic_only = var.enable_https_traffic
  tags                      = merge({ "Name" = format("%s", var.storage_account_name) }, var.tags, )

  dynamic "static_website" {
    for_each = local.if_static_website_enabled
    content {
      index_document     = var.index_path
      error_404_document = var.custom_404_path
    }
  }

  blob_properties {
    cors_rule {
      allowed_methods    = var.allowed_methods
      allowed_origins    = var.allowed_origins
      allowed_headers    = var.allowed_headers
      exposed_headers    = var.exposed_headers
      max_age_in_seconds = var.max_age_in_seconds
    }
  }

  identity {
    type = var.assign_identity ? "SystemAssigned" : null
  }
}

#---------------------------------------------------------
#                              CDN
#----------------------------------------------------------

#TODO: add CDN code
