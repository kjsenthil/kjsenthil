locals {
  front_ends = concat(
    [
      {
        name      = "default",
        host_name = "${var.name}.azurefd.net"
      }
    ],
    var.custom_frontend != null ? [var.custom_frontend] : []
  )
}
