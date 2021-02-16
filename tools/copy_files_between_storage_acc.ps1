$SrcStorageAccountName = "digitalhybridspike"
$SrcStorageAccountRG = "digital-hybrid-resources"
$SrcContainerName = "src"

$DstStorageAccountName = "digitalhybridmanual"
$DstStorageAccountRG = "digital-hybrid-resources" 
$DstContainerName = "test03"

$SrcFolderName = "test/"

function Copy-FilesToAzureStorageContainer {
    [cmdletbinding()]
    param(
        $SrcStorageAccountName,
        $SrcStorageAccountRG,
        $SrcContainerName,
        $DstStorageAccountName,
        $DstStorageAccountRG,
        $DstContainerName,
        $SrcFolderName = "",
        $Force
    )
    $SrcStorageAccount = Get-AzStorageAccount -ResourceGroupName $SrcStorageAccountRG -AccountName $SrcStorageAccountName
    $SrcContext  = $SrcStorageAccount.Context

    $DstStorageAccount = Get-AzStorageAccount -ResourceGroupName $DstStorageAccountRG -AccountName $DstStorageAccountName
    $DstContext  = $DstStorageAccount.Context

    $blobs = Get-AzStorageBlob -Context $SrcContext -Container $SrcContainerName -Prefix $SrcFolderName
    $destBlob = $blobs | Start-AzStorageBlobCopy -Context $SrcContext -DestContext $DstContext -DestContainer $DstContainerName -Force:$Force 
    $destBlob | Get-AzStorageBlobCopyState -WaitForComplete
}

function Create-AzureStorageContainer {
    [cmdletbinding()]
    param(
        $StorageAccountName,
        $StorageAccountRG,
        $ContainerName
    )
    $StorageAccount = Get-AzStorageAccount -ResourceGroupName $StorageAccountRG -AccountName $StorageAccountName
    $Context  = $StorageAccount.Context
    if($null -eq $(Get-AzStorageContainer -Name $ContainerName -Context $Context -ErrorAction Ignore)) {
        Write-Host "Storage container doesnt exists, creating container named $ContainerName"
        New-AzStorageContainer -Context $Context -Name $ContainerName
    } else {
        Write-Host "Storage container exists"
    }
}
function Remove-AzureStorageBlobs {
    [cmdletbinding()]
    param(
        $StorageAccountName,
        $StorageAccountRG,
        $ContainerName
    )
$StorageAccount = Get-AzStorageAccount -ResourceGroupName $StorageAccountRG -AccountName $StorageAccountName
$Context  = $StorageAccount.Context
if($null -eq $(Get-AzStorageContainer -Name $ContainerName -Context $Context -ErrorAction Ignore)) {
    Write-Host "[Error] Storage container doesnt exists"
} else {
    Write-Host "Storage container exists, deleting all Files in container $ContainerName"
    (Get-AzStorageBlob -Container $ContainerName -Context $Context | Remove-AzStorageBlob -Force) 1> $null
}
}


if(($null -eq $(Get-AzStorageAccount -ResourceGroupName $SrcStorageAccountRG -Name $SrcStorageAccountName -ErrorAction Ignore)) -or ($null -eq $(Get-AzStorageAccount -ResourceGroupName $DstStorageAccountRG -Name $DstStorageAccountName -ErrorAction Ignore))) {
    Write-Host "[Finish] Storage account doesnt exists"

  } else {
    Write-Host "[Finish] Storage account exists"
  }

#Remove-AzureStorageBlobs -StorageAccountName $DstStorageAccountName -StorageAccountRG $DstStorageAccountRG -ContainerName $DstContainerName
#Create-AzureStorageContainer -StorageAccountName $DstStorageAccountName -StorageAccountRG $DstStorageAccountRG -ContainerName $ContainerTestName
#Copy-FilesToAzureStorageContainer -SrcStorageAccountName $SrcStorageAccountName -SrcStorageAccountRG $SrcStorageAccountRG -SrcContainerName $SrcContainerName -SrcFolderName $SrcFolderName -DstStorageAccountName $DstStorageAccountName -DstStorageAccountRG $DstStorageAccountRG -DstContainerName $DstContainerName
