-- CreateTable
CREATE TABLE "tbl_rol" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "code" TEXT NOT NULL,

    CONSTRAINT "tbl_rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_academic_program" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "code" TEXT,

    CONSTRAINT "tbl_academic_program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_type" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "meta" TEXT,

    CONSTRAINT "list_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_list_item" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "listType_id" UUID NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "meta" TEXT,
    "order" INTEGER,

    CONSTRAINT "tbl_list_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "full_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "code_student" TEXT NOT NULL,
    "rol_id" UUID NOT NULL,
    "phone" TEXT,
    "birthdate" TIMESTAMP(3),
    "address" TEXT,
    "rh_id" UUID NOT NULL,
    "program_academic_id" UUID NOT NULL,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_car" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type_id" UUID NOT NULL,
    "driver_id" UUID NOT NULL,

    CONSTRAINT "tbl_car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_bus_driver" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "placa" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "car_id" UUID NOT NULL,
    "driver_id" UUID NOT NULL,
    "route_id" UUID NOT NULL,

    CONSTRAINT "tbl_bus_driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user_qr" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "date_user" TIMESTAMP(3),
    "code_qr" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "tbl_user_qr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_car_route" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "schedule_start" TIMESTAMP(3),
    "schedule_end" TIMESTAMP(3) NOT NULL,
    "longitude" INTEGER NOT NULL,
    "lactitude" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "tbl_car_route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "amount_perday" DOUBLE PRECISION NOT NULL,
    "equals_day" INTEGER NOT NULL,

    CONSTRAINT "tbl_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_transacions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "code" TEXT,
    "status" TEXT NOT NULL,
    "date_payment" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "equal_day" INTEGER NOT NULL,
    "amount_per_day" INTEGER NOT NULL,
    "type_payment_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,

    CONSTRAINT "tbl_transacions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user_plan" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "date_start" TEXT NOT NULL,
    "date_end" TEXT NOT NULL,
    "transaction_id" UUID NOT NULL,

    CONSTRAINT "tbl_user_plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_rol_code_key" ON "tbl_rol"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_academic_program_code_key" ON "tbl_academic_program"("code");

-- CreateIndex
CREATE UNIQUE INDEX "list_type_code_key" ON "list_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_list_item_code_key" ON "tbl_list_item"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_email_key" ON "tbl_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_code_student_key" ON "tbl_user"("code_student");

-- AddForeignKey
ALTER TABLE "tbl_list_item" ADD CONSTRAINT "tbl_list_item_listType_id_fkey" FOREIGN KEY ("listType_id") REFERENCES "list_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "tbl_rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_rh_id_fkey" FOREIGN KEY ("rh_id") REFERENCES "tbl_list_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_program_academic_id_fkey" FOREIGN KEY ("program_academic_id") REFERENCES "tbl_academic_program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_car" ADD CONSTRAINT "tbl_car_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "tbl_list_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_bus_driver" ADD CONSTRAINT "tbl_bus_driver_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "tbl_car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_bus_driver" ADD CONSTRAINT "tbl_bus_driver_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_bus_driver" ADD CONSTRAINT "tbl_bus_driver_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "tbl_car_route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_qr" ADD CONSTRAINT "tbl_user_qr_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transacions" ADD CONSTRAINT "tbl_transacions_type_payment_id_fkey" FOREIGN KEY ("type_payment_id") REFERENCES "tbl_list_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transacions" ADD CONSTRAINT "tbl_transacions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transacions" ADD CONSTRAINT "tbl_transacions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "tbl_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_plan" ADD CONSTRAINT "tbl_user_plan_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "tbl_transacions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
