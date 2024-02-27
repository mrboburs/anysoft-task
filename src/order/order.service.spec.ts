import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderEnum } from './dto/order.dto';
import { KnexModule } from 'nestjs-knex';
import { OrderTest } from './order-test';

describe('OrderService', () => {
    let service: OrderService;
    let orderTest: OrderTest

    let orderCreate: CreateOrderDto = {
        description: 'lorem',
        estimate: 1,
        status: OrderEnum.ACTIVE,
        title: 'lorem',
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                KnexModule.forRootAsync({
                    useFactory: () => ({
                        config: {
                            client: "pg",
                            useNullAsDefault: true,
                            connection: {
                                host: 'localhost',
                                user: 'postgres',
                                port: "5434",
                                password: '123',
                                database: 'nest',
                            },
                        },
                    }),
                }),
            ],
            providers: [
                {
                    provide: OrderService,
                    useValue: {
                        create: jest.fn(),
                    }
                },
                {
                    provide: OrderTest,
                    useValue: {

                    }
                }
            ],
        }).compile();

        service = module.get<OrderService>(OrderService);
        orderTest = module.get<OrderTest>(OrderTest);
    });
   
    describe("create", () => {
        it("should be create order ", async () => {
            let resultData = {
                id: 204,            
            };
            (orderTest.findOneOrder as jest.Mock).mockResolvedValue(resultData);
            (service.create as jest.Mock).mockResolvedValue(orderCreate);
            const result = await service.create(orderCreate);

            expect(orderTest.findOneOrder).toHaveBeenCalledWith({title: "lorem"})
            expect(service.create).toHaveBeenCalledWith(orderCreate)
            expect(result).toEqual(orderCreate);
        });

        it("should be create order second", async () => {
            let resultData = {
                id: 204,            
            };

            (service.create as jest.Mock).mockResolvedValue(orderCreate);
            const result = await service.create(orderCreate);
            expect(service.create).toHaveBeenCalledWith(orderCreate)
            expect(result).toEqual(orderCreate);
        });
    })
});
