import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { ToasterCustom } from "@/components/common/ToasterCustom";
import { addDevice } from "../../utils/ListApi";

const MasterDeviceAdd = (props) => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  useEffect(() => {
    if (props.modalAddOpen) {
      formik.resetForm()
    }
  }, [props.modalAddOpen])

  const handleClose = () => {
    props.setModalAddOpen(false);
  }

  // Validation Form
  const formik = useFormik({
    initialValues:
    {
      deviceName: "",
      deviceType: "",
      clusterId: "",
    },
    validationSchema: Yup.object
      ({
        deviceName: Yup.string().required("Device Name is required."),
        deviceType: Yup.string().required("Device Type is required."),
        clusterId: Yup.string().required("Cluster Name is required."),
      }),

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      setLoadingSpinner(true)
      await SaveDeviceAction(values)
      setSubmitting(false)
    },
  });

  const SaveDeviceAction = useCallback(async (param) => {
    try {
      await ToasterCustom.promise(addDevice(param), {
        loading: "Creating device...",
        success: "Device added successfully.",
        error: (err) => err?.response?.data?.message || "System is unavailable, please try again later."
      })
      props.refreshTable();
      handleClose()
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingSpinner(false)
    }
  }, [])

  return (
    <Dialog
      open={props.modalAddOpen}
      onOpenChange={(open) => { if (!open) handleClose() }}
    >
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Device</DialogTitle>
          <DialogDescription>Add a new device to the master list</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6"
        >
          <FieldGroup className="gap-2">
            <Field className="gap-2">
              <FieldLabel>Device Name</FieldLabel>
              <InputGroup className="overflow-hidden">
                <InputGroupInput
                  id="deviceName"
                  name="deviceName"
                  type="text"
                  placeholder="Enter device name"
                  value={formik.values.deviceName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={formik.touched.deviceName && !!formik.errors.deviceName}
                />
              </InputGroup>
              {formik.touched.deviceName && formik.errors.deviceName && (
                <FieldDescription className="text-xs text-destructive">{formik.errors.deviceName}</FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel>Device Type</FieldLabel>
              <Select
                value={formik.values.deviceType}
                onValueChange={(val) => formik.setFieldValue("deviceType", val)}
              // onOpenChange={() => formik.setFieldTouched("deviceType", true)}
              >
                <SelectTrigger
                  id="deviceType"
                  aria-invalid={formik.touched.deviceType && !!formik.errors.deviceType}
                >
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {props.deviceTypeOption.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formik.touched.deviceType && formik.errors.deviceType && (
                <FieldDescription className="text-xs text-destructive">{formik.errors.deviceType}</FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel>Cluster Name</FieldLabel>
              <Select
                value={formik.values.clusterName}
                onValueChange={(val) => formik.setFieldValue("clusterId", val)}
              // onOpenChange={() => formik.setFieldTouched("clusterId", true)}
              >
                <SelectTrigger
                  id="clusterId"
                  aria-invalid={formik.touched.clusterId && !!formik.errors.clusterId}
                >
                  <SelectValue placeholder="Select cluster name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {props.clusterOption.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formik.touched.clusterId && formik.errors.clusterId && (
                <FieldDescription className="text-xs text-destructive">{formik.errors.clusterId}</FieldDescription>
              )}
            </Field>

            <DialogFooter className="flex-row gap-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1"
                disabled={loadingSpinner}
              >
                <Spinner
                  data-icon="inline-start"
                  className={loadingSpinner ? "flex" : 'hidden'}
                />
                {loadingSpinner ? "Saving..." : "Add Device"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

MasterDeviceAdd.propTypes = {
  modalAddOpen: PropTypes.any,
  setModalAddOpen: PropTypes.any,
  refreshTable: PropTypes.any,
  clusterOption: PropTypes.any,
  deviceTypeOption: PropTypes.any,
};

export default MasterDeviceAdd