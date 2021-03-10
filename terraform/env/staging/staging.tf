resource "azurerm_resource_group" "staging_resource_group" {
  name     = format("%s-%s-rg", local.environment, local.rg_name)
  location = local.location
}

module "staging_main" {
  source             = "../../main"
  is_apim            = true
  is_apima           = true
  environment        = local.environment
  environment_prefix = local.environment
  rg_name            = azurerm_resource_group.staging_resource_group.name
  apim_name          = format("%s-%s-mgmt", local.environment, local.apim_name)
  path               = format("%s%s", local.environment, local.path)
}

# The API operation deployed in Staging.
resource "azurerm_api_management_api_operation" "api_operation" {
  for_each            = local.api_definitions
  operation_id        = each.value.operation_id
  api_name            = format("%s-%s", local.environment, local.apima_name)
  api_management_name = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = format("%s-%s-rg", local.environment, local.rg_name)
  display_name        = each.value.display_name
  method              = each.value.method
  url_template        = each.value.url_template
  description         = each.value.description

  response {
    status_code = 200
  }

  dynamic "template_parameter" {
    for_each = each.value.has_template_parameter ? [1] : []
    content {
      name     = "sedol"
      required = true
      type     = "string"
    }
  }

  depends_on = [module.staging_main]
}

# The API operation policy For the API. Deployed in Staging.
resource "azurerm_api_management_api_operation_policy" "api_operation_policy" {
  for_each            = local.api_definitions
  api_name            = format("%s-%s", local.environment, local.apima_name)
  api_management_name = format("%s-%s-mgmt", local.environment, local.apim_name)
  resource_group_name = format("%s-%s-rg", local.environment, local.rg_name)
  operation_id        = each.value.operation_id
  xml_content         = templatefile(abspath(format("%s/../../modules/policy_documents/api_operation_policy.xml", path.module)), { values = { methods = split(", ", each.value.method), backend_url = local.bestinvest_backend_base_url, insert_headers = each.value.insert_headers } })
  depends_on          = [module.staging_main, azurerm_api_management_api_operation.api_operation]
}


# Storage account for front-end
resource "azurerm_storage_account" "front_end_storage_account" {
  name                      = format("%s%s", "dighybpr", local.environment)
  resource_group_name       = format("%s-%s-rg", local.environment, local.rg_name)
  location                  = local.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true

  dynamic "static_website" {
    for_each = local.if_static_website_enabled
    content {
      index_document     = "index.html"
      error_404_document = "error.html"
    }
  }

  blob_properties {
    cors_rule {
      allowed_methods    = ["GET", "HEAD", "POST", "OPTIONS", "PUT"]
      allowed_origins    = ["*"]
      allowed_headers    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 60 * 60 * 24 * 2
    }
  }

  identity {
    type = "SystemAssigned"
  }
}